(function () {
  if (!location.protocol.startsWith("http")) return;

  const PIN_KEY = "vendrix_pin";
  const DATA_KEYS = ["v_bi_data", "v_bi_lotes", "v_bi_dic", "v_bi_gastos", "v_bi_tel"];
  let vendrixPin = localStorage.getItem(PIN_KEY);
  let saveTimer = null;
  let restoringFromCloud = false;
  let accountClient = null;
  let accountMode = false;

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
    restoringFromCloud = true;
    DATA_KEYS.forEach(key => localStorage.removeItem(key));
    Object.keys(state || {}).forEach(key => {
      if (DATA_KEYS.includes(key)) localStorage.setItem(key, state[key]);
    });
    restoringFromCloud = false;
  }

  function hasData(state) {
    return state && Object.keys(state).some(key => DATA_KEYS.includes(key));
  }

  async function authHeaders() {
    if (!accountMode) return { "x-vendrix-pin": getPin() };
    const { data } = await accountClient.auth.getSession();
    const token = data.session?.access_token;
    if (!token) throw new Error("Sesion cerrada");
    return { Authorization: `Bearer ${token}` };
  }

  async function readCloud() {
    const response = await fetch("/api/state?ts=" + Date.now(), {
      method: "GET",
      headers: await authHeaders(),
      cache: "no-store"
    });
    if (response.status === 401) {
      if (accountMode) {
        await accountClient.auth.signOut();
        showLogin("Tu sesion vencio. Ingresa nuevamente.");
      } else {
        localStorage.removeItem(PIN_KEY);
        alert("PIN incorrecto. Recarga la pagina e ingresa el PIN correcto.");
      }
      throw new Error("Acceso no valido");
    }
    if (!response.ok) throw new Error("No se pudo leer la base");
    return response.json();
  }

  async function writeCloud(state) {
    const response = await fetch("/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeaders()) },
      body: JSON.stringify(state),
      cache: "no-store"
    });
    if (!response.ok) throw new Error("No se pudo guardar en la base");
    updateSyncLabel("Guardado en la nube");
  }

  async function initialSync() {
    const cloudState = await readCloud();
    const localState = getLocalState();
    if (hasData(cloudState)) {
      const cloudSnapshot = JSON.stringify(cloudState);
      const localSnapshot = JSON.stringify(localState);
      setLocalState(cloudState);
      if (cloudSnapshot !== localSnapshot) location.reload();
      return;
    }
    if (hasData(localState)) await writeCloud(localState);
  }

  async function saveNow() {
    if (restoringFromCloud) return;
    await writeCloud(getLocalState());
  }

  function scheduleSave() {
    if (restoringFromCloud) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveNow().catch(() => updateSyncLabel("Pendiente de sincronizar"));
    }, 500);
  }

  async function reloadFromCloud() {
    const cloudState = await readCloud();
    setLocalState(cloudState);
    location.reload();
  }

  function updateSyncLabel(message) {
    const label = document.getElementById("syncStatus");
    if (label) label.textContent = message;
  }

  function installStorageHooks() {
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
  }

  function addLoginStyle() {
    if (document.getElementById("vendrixAccountStyle")) return;
    const style = document.createElement("style");
    style.id = "vendrixAccountStyle";
    style.textContent = `
      .vendrix-account-gate{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:20px;background:linear-gradient(135deg,#eaf7f1,#edf5fc);font-family:Segoe UI,system-ui,sans-serif}
      .vendrix-account-card{width:min(100%,390px);padding:28px;border:1px solid #dce7e4;border-radius:16px;background:#fff;box-shadow:0 24px 60px rgba(39,65,58,.18);color:#26333b}
      .vendrix-account-logo{display:grid;place-items:center;width:48px;height:48px;margin-bottom:14px;border-radius:14px;background:#2f9b7d;color:#fff;font-size:1.25rem;font-weight:900}
      .vendrix-account-card h1{margin:0;font-size:1.45rem}.vendrix-account-card p{margin:8px 0 18px;color:#6b7b83;line-height:1.4}
      .vendrix-account-card label{display:block;margin:12px 0 6px;font-size:.78rem;font-weight:800;color:#52636b}.vendrix-account-card input{width:100%;min-height:44px;box-sizing:border-box;border:1px solid #dce7e4;border-radius:10px;padding:0 12px;font:inherit}
      .vendrix-account-card button{width:100%;min-height:44px;margin-top:16px;border:0;border-radius:10px;background:#2f9b7d;color:#fff;font:inherit;font-weight:800;cursor:pointer}.vendrix-account-error{min-height:18px;margin-top:10px;color:#bd5147;font-size:.82rem}
    `;
    document.head.appendChild(style);
  }

  function showLogin(message = "Ingresa con la cuenta de VENDRIX para sincronizar.") {
    addLoginStyle();
    let gate = document.getElementById("vendrixAccountGate");
    if (!gate) {
      gate = document.createElement("div");
      gate.id = "vendrixAccountGate";
      gate.className = "vendrix-account-gate";
      gate.innerHTML = `<form class="vendrix-account-card" id="vendrixAccountForm"><div class="vendrix-account-logo">V</div><h1>VENDRIX</h1><p id="vendrixAccountMessage"></p><label>Correo</label><input id="vendrixEmail" type="email" autocomplete="email" required><label>Contrasena</label><input id="vendrixPassword" type="password" autocomplete="current-password" required><button type="submit">Ingresar</button><div class="vendrix-account-error" id="vendrixAccountError"></div></form>`;
      document.body.appendChild(gate);
      gate.querySelector("form").addEventListener("submit", signIn);
    }
    document.getElementById("vendrixAccountMessage").textContent = message;
    gate.hidden = false;
  }

  function hideLogin() {
    const gate = document.getElementById("vendrixAccountGate");
    if (gate) gate.hidden = true;
  }

  async function signIn(event) {
    event.preventDefault();
    const email = document.getElementById("vendrixEmail").value.trim();
    const password = document.getElementById("vendrixPassword").value;
    const error = document.getElementById("vendrixAccountError");
    error.textContent = "Verificando cuenta...";
    const { error: authError } = await accountClient.auth.signInWithPassword({ email, password });
    if (authError) {
      error.textContent = "No se pudo ingresar. Revisa el correo y la contrasena.";
      return;
    }
    hideLogin();
    initialSync().catch(() => updateSyncLabel("No se pudo sincronizar"));
  }

  function loadSupabaseClient(config) {
    return new Promise((resolve, reject) => {
      if (window.supabase) return resolve();
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    }).then(() => {
      accountClient = window.supabase.createClient(config.url, config.anonKey);
    });
  }

  async function start() {
    installStorageHooks();
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
    try {
      const response = await fetch("/api/auth-config", { cache: "no-store" });
      const config = response.ok ? await response.json() : { enabled: false };
      if (config.enabled) {
        accountMode = true;
        await loadSupabaseClient(config);
        const { data } = await accountClient.auth.getSession();
        if (!data.session) return showLogin();
        await initialSync();
      } else {
        await initialSync();
      }
    } catch {
      updateSyncLabel("Modo local: sin conexion a la nube");
    }
  }

  window.vendrixSyncNow = saveNow;
  window.vendrixReloadFromCloud = reloadFromCloud;
  start();
})();
