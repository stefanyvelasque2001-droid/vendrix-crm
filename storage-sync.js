(function () {
  if (!location.protocol.startsWith("http")) return;

  const PIN_KEY = "vendrix_pin";
  let vendrixPin = localStorage.getItem(PIN_KEY);
  let saveTimer = null;

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

  async function saveRemoteNow() {
    try {
      const response = await fetch("/api/state", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-vendrix-pin": getPin()
        },
        body: JSON.stringify(snapshotStorage())
      });

      if (!response.ok) {
        console.warn("VENDRIX no pudo guardar en Supabase.");
      }
    } catch (error) {
      console.warn("VENDRIX esta trabajando localmente hasta reconectar.");
    }
  }

  function saveRemote() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveRemoteNow, 350);
  }

  function loadRemote() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/state", false);
    xhr.setRequestHeader("x-vendrix-pin", getPin());
    xhr.send(null);

    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText || "{}");
      restoreStorage(data);
    } else if (xhr.status === 401) {
      localStorage.removeItem(PIN_KEY);
      alert("PIN incorrecto. Recarga la pagina e intenta otra vez.");
    }
  }

  try {
    loadRemote();
  } catch (error) {
    console.warn("VENDRIX trabajara con datos locales hasta reconectar.");
  }

  const originalSetItem = Storage.prototype.setItem;
  const originalRemoveItem = Storage.prototype.removeItem;
  const originalClear = Storage.prototype.clear;

  Storage.prototype.setItem = function (key, value) {
    originalSetItem.call(this, key, value);

    if (this === localStorage && key !== PIN_KEY) {
      saveRemote();
    }
  };

  Storage.prototype.removeItem = function (key) {
    originalRemoveItem.call(this, key);

    if (this === localStorage && key !== PIN_KEY) {
      saveRemote();
    }
  };

  Storage.prototype.clear = function () {
    originalClear.call(this);
    saveRemote();
  };

  window.vendrixForceSync = saveRemoteNow;
})();
