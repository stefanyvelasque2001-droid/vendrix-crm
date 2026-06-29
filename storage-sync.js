(function () {
  if (!location.protocol.startsWith("http")) return;

  const PIN_KEY = "vendrix_pin";
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

  function snapshotStorage() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === PIN_KEY) continue;
      data[key] = localStorage.getItem(key);
    }
    return data;
  }

  function restoreStorage(data) {
    Object.keys(data || {}).forEach(key => {
      if (key === PIN_KEY) return;
      localStorage.setItem(key, data[key]);
    });
  }

  async function fetchCloud() {
    const response = await fetch("/api/state", {
      headers: { "x-vendrix-pin": getPin() },
      cache: "no-store"
    });

    if (!response.ok) throw new Error("No se pudo leer Supabase");
    return response.json();
  }

  async function saveRemoteNow() {
    try {
      const payload = snapshotStorage();
      lastCloudSnapshot = JSON.stringify(payload);

      await fetch("/api/state", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-vendrix-pin": getPin()
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.warn("VENDRIX no pudo guardar en Supabase.");
    }
  }

  function saveRemote() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveRemoteNow, 350);
  }

  async function loadRemote() {
    const data = await fetchCloud();
    lastCloudSnapshot = JSON.stringify(data || {});
    restoreStorage(data);
  }

  async function checkRemoteChanges() {
    try {
      const data = await fetchCloud();
      const nextSnapshot = JSON.stringify(data || {});

      if (lastCloudSnapshot && nextSnapshot !== lastCloudSnapshot) {
        restoreStorage(data);
        location.reload();
      }

      lastCloudSnapshot = nextSnapshot;
    } catch (error) {
      console.warn("No se pudo verificar cambios remotos.");
    }
  }

  loadRemote().catch(() => {
    console.warn("VENDRIX trabajara localmente hasta reconectar.");
  });

  const originalSetItem = Storage.prototype.setItem;
  const originalRemoveItem = Storage.prototype.removeItem;
  const originalClear = Storage.prototype.clear;

  Storage.prototype.setItem = function (key, value) {
    originalSetItem.call(this, key, value);
    if (this === localStorage && key !== PIN_KEY) saveRemote();
  };

  Storage.prototype.removeItem = function (key) {
    originalRemoveItem.call(this, key);
    if (this === localStorage && key !== PIN_KEY) saveRemote();
  };

  Storage.prototype.clear = function () {
    originalClear.call(this);
    saveRemote();
  };

  setInterval(checkRemoteChanges, 15000);
})();
