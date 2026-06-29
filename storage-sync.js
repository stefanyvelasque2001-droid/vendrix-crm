(function () {
  if (!location.protocol.startsWith("http")) return;

  const PIN_KEY = "vendrix_pin";
  const DATA_KEYS = ["v_bi_data", "v_bi_lotes", "v_bi_dic", "v_bi_gastos", "v_bi_tel"];
  let vendrixPin = localStorage.getItem(PIN_KEY);
  let saveTimer = null;
  let lastCloudSnapshot = "";

  function getPin() {
    if (!vendrixPin) {
      vendrixPin = prompt("Ingresa el PIN de VENDRIX");
      if (vendrixPin) localStorage.setItem(PIN_KEY, vendrixPin);
    }
    return vendrixPin || "";
  }

  function getLocalState() {
    const state = {};
    DATA_KEYS.forEach(key => {
      const value = localStorage.getItem(key);
      if (value !== null) state[key] = value;
    });
    return state;
  }

  function setLocalState(state) {
    DATA_KEYS.forEach(key => localStorage.removeItem(key));
    Object.keys(state || {}).forEach(key => {
      if (DATA_KEYS.includes(key)) localStorage.setItem(key, state[key]);
    });
  }

  function hasData(state) {
    return state && Object.keys(state).some(key => DATA_KEYS.includes(key));
  }

  async function readCloud() {
    const response = await fetch("/api/state?ts=" + Date.now(), {
      method: "GET",
      headers: { "x-vendrix-pin": getPin() },
      cache: "no-store"
    });

    if (response.status === 401) {
      localStorage.removeItem(PIN_KEY);
      alert("PIN incorrecto. Recarga la pagina e ingresa el PIN correcto.");
      throw new Error("PIN incorrecto");
    }

    if (!response.ok) throw new Error("No se pudo leer la base");
    return response.json();
  }

  async function writeCloud(state) {
    const response = await fetch("/api/state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-vendrix-pin": getPin()
      },
      body: JSON.stringify(state)
    });

    if (!response.ok) throw new Error("No se pudo guardar en la base");
    lastCloudSnapshot = JSON.stringify(state || {});
  }

  async function initialSync() {
    const cloudState = await readCloud();
    const localState = getLocalState();

    if (hasData(cloudState)) {
      lastCloudSnapshot = JSON.stringify(cloudState);
      setLocalState(cloudState);
      return;
    }

    if (hasData(localState)) {
      lastCloudSnapshot = JSON.stringify(localState);
      await writeCloud(localState);
    }
  }

  async function saveNow() {
    const localState = getLocalState();
    await writeCloud(localState);
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveNow().catch(() => {
        console.warn("No se pudo guardar en Supabase.");
      });
    }, 400);
  }

  async function checkForChanges() {
    const cloudState = await readCloud();
    const cloudSnapshot = JSON.stringify(cloudState || {});

    if (lastCloudSnapshot && cloudSnapshot !== lastCloudSnapshot) {
      setLocalState(cloudState);
      location.reload();
      return;
    }

    lastCloudSnapshot = cloudSnapshot;
  }

  const originalSetItem = Storage.prototype.setItem;
  const originalRemoveItem = Storage.prototype.removeItem;
  const originalClear = Storage.prototype.clear;

  Storage.prototype.setItem = function (key, value) {
    originalSetItem.call(this, key, value);
    if (this === localStorage && DATA_KEYS.includes(key)) scheduleSave();
  };

  Storage.prototype.removeItem = function (key) {
    originalRemoveItem.call(this, key);
    if (this === localStorage && DATA_KEYS.includes(key)) scheduleSave();
  };

  Storage.prototype.clear = function () {
    originalClear.call(this);
    scheduleSave();
  };

  initialSync()
    .then(() => {
      setInterval(() => {
        checkForChanges().catch(() => {});
      }, 10000);
    })
    .catch(() => {
      console.warn("VENDRIX trabajara localmente hasta reconectar.");
    });

  window.vendrixSyncNow = saveNow;
})();
