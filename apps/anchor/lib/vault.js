/* Vault: this app's content is encrypted (AES-256-GCM, key from the 8-digit passcode via PBKDF2-SHA256).
   Without the passcode the published files are unreadable.
   Optional quick PIN: after a passcode unlock you may set a 4-digit PIN for this phone. The content key is then kept
   on the phone, encrypted with a key derived from the PIN; 5 wrong PINs erase it and the passcode is needed again. */
(function () {
  "use strict";
  const AWAY_MS = 60e3, PIN_ITER = 310000;
  const scope = location.pathname.replace(/[^/]*$/, ""), PK = "vault-pin:" + scope, OK = "vault-pin-offered:" + scope;
  let KEY = null, RAW = null, META = null, opts = {}, fails = 0, waitUntil = 0, entry = "", first = "", waiting = null, hiddenAt = 0, busy = false, mode = "code";
  const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0)), tob64 = u => btoa(String.fromCharCode(...new Uint8Array(u)));
  const LEN = () => mode === "code" ? 8 : 4;
  const meta = () => META ? Promise.resolve(META) : fetch(opts.meta || "data/vault.json", { cache: "no-cache" }).then(r => r.json()).then(m => (META = m));
  const ls = { get: k => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }, del: k => { try { localStorage.removeItem(k); } catch {} } };
  const storedPin = () => { try { return JSON.parse(ls.get(PK) || "null"); } catch { return null; } };
  async function pbkdf2Bits(secret, salt, iter) {
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), "PBKDF2", false, ["deriveBits"]);
    return crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" }, base, 256);
  }
  const aes = (raw, uses) => crypto.subtle.importKey("raw", raw, { name: "AES-GCM" }, false, uses);
  const dec = async (key, blob) => new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(blob.iv) }, key, b64(blob.ct)));
  async function useRaw(raw) { const k = await aes(raw, ["decrypt"]); if (await dec(k, META.check) !== "ok") throw 0; KEY = k; RAW = raw; }

  function css() {
    if (document.getElementById("vault-css")) return; const t = opts.theme || {}, s = document.createElement("style"); s.id = "vault-css";
    s.textContent = `#vault{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;background:${t.bg || "#111"};color:${t.ink || "#eee"};font-family:${t.font || "system-ui,sans-serif"}}
#vault h2{font:600 26px/1.2 ${t.display || "inherit"};margin:14px 0 4px}#vault .sub{color:${t.muted || "#999"};font-size:14.5px;min-height:22px;max-width:320px}
#vault .vd{display:flex;gap:10px;margin:20px 0 24px}#vault .vd i{width:12px;height:12px;border-radius:50%;border:1.5px solid ${t.accent || "#ccc"}}#vault .vd i.on{background:${t.accent || "#ccc"}}
#vault .vd.shake{animation:vshake .35s}@keyframes vshake{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
#vault .vk{display:grid;grid-template-columns:repeat(3,72px);gap:14px}#vault .vk button{width:72px;height:72px;border-radius:50%;border:0;background:${t.key || "rgba(255,255,255,.08)"};color:inherit;font:500 26px system-ui,sans-serif;cursor:pointer}
#vault .vk button:active{background:${t.accent || "#ccc"};color:${t.bg || "#111"}}#vault .vk .g{background:none;font-size:15px;color:${t.muted || "#999"}}
#vault .vb{display:block;width:260px;margin:8px auto 0;padding:13px 16px;border-radius:999px;border:0;font:650 15px system-ui,sans-serif;cursor:pointer;background:${t.key || "rgba(255,255,255,.08)"};color:inherit}
#vault .vb.pri{background:${t.accent || "#ccc"};color:${t.bg || "#111"}}#vault .vl{background:none;border:0;color:${t.muted || "#999"};font:600 14px system-ui,sans-serif;margin-top:18px;cursor:pointer;text-decoration:underline}
#vault .spin{width:22px;height:22px;border:2.5px solid ${t.muted || "#999"};border-top-color:transparent;border-radius:50%;animation:vspin .8s linear infinite;margin:0 auto}@keyframes vspin{to{transform:rotate(360deg)}}
#vault-cover{position:fixed;inset:0;z-index:2147482999;background:${t.bg || "#111"}}`;
    document.head.appendChild(s);
  }
  function shell(inner) {
    css(); let V = document.getElementById("vault"); if (!V) { V = document.createElement("div"); V.id = "vault"; document.body.appendChild(V); }
    V.innerHTML = `${opts.icon ? `<img src="${opts.icon}" width="64" height="64" style="border-radius:16px" alt="">` : ""}<h2>${opts.title || "Locked"}</h2>${inner}
      ${opts.footer ? `<div style="margin-top:22px;font-size:12px;color:${(opts.theme || {}).muted || "#999"}">${opts.footer}</div>` : ""}`;
  }
  const SUB = { code: "Enter your 8-digit passcode", pin: "Enter your PIN", set1: "Choose a 4-digit PIN for this phone", set2: "Enter the PIN once more" };
  function draw(msg) {
    entry = "";
    shell(`<div class="sub" id="vsub">${msg || SUB[mode]}</div>
      <div class="vd" id="vd">${Array.from({ length: LEN() }, () => "<i></i>").join("")}</div>
      <div class="vk">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => `<button data-vk="${k}">${k}</button>`).join("")}<span></span><button data-vk="0">0</button><button class="g" data-vk="del" aria-label="Delete">⌫</button></div>
      ${mode === "pin" ? `<button class="vl" data-vact="usecode">Use the 8-digit passcode instead</button>` : mode === "set1" || mode === "set2" ? `<button class="vl" data-vact="skip">Not now</button>` : ""}`);
  }
  const close = () => { const V = document.getElementById("vault"); if (V) V.remove(); const c = document.getElementById("vault-cover"); if (c) c.remove(); };
  const done = () => { close(); const w = waiting; waiting = null; if (w) w(); };
  function offer() {
    ls.set(OK, "1");
    shell(`<div class="sub" style="margin-bottom:18px">Unlocked. Set a 4-digit PIN for quicker unlocking on this phone? You can still use the passcode any time.</div>
      <button class="vb pri" data-vact="setpin">Set a quick PIN</button><button class="vb" data-vact="skip">Not now</button>`);
  }
  const dots = () => document.querySelectorAll("#vd i").forEach((d, i) => d.classList.toggle("on", i < entry.length));
  function bad(msg) { const p = document.getElementById("vd"); if (p) { p.classList.remove("shake"); void p.offsetWidth; p.classList.add("shake"); } entry = ""; dots(); const s = document.getElementById("vsub"); if (s) s.textContent = msg; }
  const spin = () => { const s = document.getElementById("vsub"); if (s) s.innerHTML = `<div class="spin"></div>`; };
  async function savePin(pin) {
    const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    const wk = await aes(await pbkdf2Bits(pin, salt, PIN_ITER), ["encrypt"]);
    const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, wk, RAW);
    ls.set(PK, JSON.stringify({ v: 1, iter: PIN_ITER, salt: tob64(salt), iv: tob64(iv), ct: tob64(ct) }));
  }
  async function submit() {
    if (Date.now() < waitUntil) return bad(`Too many tries. Wait ${Math.ceil((waitUntil - Date.now()) / 1000)} s`);
    if (mode === "set1") { first = entry; mode = "set2"; return draw(); }
    if (mode === "set2") {
      if (entry !== first) { mode = "set1"; first = ""; return draw("Those didn't match. Choose a PIN again."); }
      busy = true; spin(); try { await savePin(entry); } catch (e) {} busy = false; first = ""; mode = "code"; return done();
    }
    busy = true; spin();
    try {
      await meta();
      if (mode === "code") {
        await useRaw(await pbkdf2Bits(entry, b64(META.salt), META.iter)); fails = 0; busy = false;
        if (!storedPin() && !ls.get(OK) && window.crypto && crypto.subtle) return offer();
        return done();
      }
      const P = storedPin(); if (!P) { mode = "code"; busy = false; return draw(); }
      let raw; try { const wk = await aes(await pbkdf2Bits(entry, b64(P.salt), P.iter), ["decrypt"]); raw = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(P.iv) }, wk, b64(P.ct)); }
      catch (e) { throw "wrong"; }
      try { await useRaw(raw); } catch (e) { ls.del(PK); mode = "code"; busy = false; return draw("The content was updated. Enter your 8-digit passcode once."); }
      fails = 0; busy = false; return done();
    } catch (e) {
      busy = false; if (!(window.crypto && crypto.subtle)) return bad("This browser can't unlock it. Open the link in Chrome or Safari.");
      fails++;
      if (mode === "pin" && fails >= 5) { ls.del(PK); fails = 0; mode = "code"; return draw("Too many wrong PINs. The quick PIN was removed: enter your 8-digit passcode."); }
      if (mode === "code" && fails >= 5) { waitUntil = Date.now() + 30e3; fails = 0; return bad("Too many tries. Wait 30 s"); }
      bad(`Wrong ${mode === "pin" ? "PIN" : "passcode"}${fails >= 3 ? ` · ${5 - fails} tries left` : ""}`);
    }
  }
  function press(v) { if (busy || !document.getElementById("vd")) return; if (v === "del") { entry = entry.slice(0, -1); return dots(); } if (entry.length < LEN()) { entry += v; dots(); if (entry.length === LEN()) setTimeout(submit, 80); } }
  document.addEventListener("click", e => {
    if (!e.target.closest) return; const k = e.target.closest("[data-vk]"), a = e.target.closest("[data-vact]");
    if (k) { e.stopPropagation(); press(k.dataset.vk); }
    else if (a) { e.stopPropagation(); const v = a.dataset.vact;
      if (v === "usecode") { mode = "code"; fails = 0; draw(); }
      else if (v === "setpin") { mode = "set1"; first = ""; draw(); }
      else if (v === "skip") { mode = "code"; first = ""; KEY ? done() : draw(); }
      else if (v === "removepin") { ls.del(PK); mode = "code"; done(); if (opts.onToast) opts.onToast("Quick PIN removed"); } }
  }, true);
  addEventListener("keydown", e => { if (!document.getElementById("vd")) return; if (/^\d$/.test(e.key)) press(e.key); else if (e.key === "Backspace") press("del"); });
  /* cover the screen in the app switcher, ask again after a minute away */
  document.addEventListener("visibilitychange", () => {
    if (!KEY || document.getElementById("vault")) return;
    if (document.hidden) { hiddenAt = Date.now(); if (!document.getElementById("vault-cover")) { css(); const c = document.createElement("div"); c.id = "vault-cover"; document.body.appendChild(c); } if (opts.onHide) opts.onHide(); }
    else if (Date.now() - hiddenAt > AWAY_MS) Vault.lock(); else { const c = document.getElementById("vault-cover"); if (c) c.remove(); }
  });
  const Vault = {
    setup(o) { opts = o || {}; return Vault; },
    /* show the keypad and resolve once the right PIN or passcode is entered */
    unlock() { return new Promise(res => { waiting = res; fails = 0; mode = storedPin() ? "pin" : "code"; draw(); meta().catch(() => bad("Couldn't load. Are you online?")); }); },
    lock() { if (opts.onLock) opts.onLock(); return Vault.unlock().then(() => { if (opts.onUnlock) opts.onUnlock(); }); },
    /* settings: set, change or remove the quick PIN (only while unlocked) */
    managePin() {
      if (!RAW) return; return new Promise(res => { waiting = res;
        if (storedPin()) shell(`<div class="sub" style="margin-bottom:18px">A quick PIN is set on this phone.</div><button class="vb pri" data-vact="setpin">Change the PIN</button><button class="vb" data-vact="removepin">Remove the PIN</button><button class="vb" data-vact="skip">Close</button>`);
        else { mode = "set1"; first = ""; draw(); } });
    },
    get hasPin() { return !!storedPin(); },
    /* fetch an encrypted JSON file and return the parsed content */
    async load(url) { if (!KEY) await Vault.unlock(); const blob = await (await fetch(url)).json(); return JSON.parse(await dec(KEY, blob)); },
    get unlocked() { return !!KEY; }
  };
  window.Vault = Vault;
})();
