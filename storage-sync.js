(function () {
  if (!location.protocol.startsWith("http")) return;

  let vendrixPin = localStorage.getItem("vendrix_pin");

  function getPin() {
    if (!vendrixPin) {
      vendrixPin = prompt("Ingresa el PIN de VENDRIX");
      if (vendrixPin) localStorage.setItem("vendrix_pin", vendrixPin);
    }
    return vendrixPin || "";
  }

  function snapshotStorage() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
    return data;
  }

  function restoreStorage(data) {
    Object.keys(data || {}).forEach(key => {
      localStorage.setItem(key, data[key]);
    });
  }

  function saveRemote() {
    fetch("/api/state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-vendrix-pin": getPin()
      },
      body: JSON.stringify(snapshotStorage())
    }).catch(() => {});
  }

  function loadRemote() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/state", false);
    xhr.setRequestHeader("x-vendrix-pin", getPin());
    xhr.send(null);

    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText || "{}");
      restoreStorage(data);
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
    if (this === localStorage) saveRemote();
  };

  Storage.prototype.removeItem = function (key) {
    originalRemoveItem.call(this, key);
    if (this === localStorage) saveRemote();
  };

  Storage.prototype.clear = function () {
    originalClear.call(this);
    if (this === localStorage) saveRemote();
  };
})();