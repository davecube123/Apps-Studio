/* Vault: this app's content is encrypted (AES-256-GCM, key from the passcode via PBKDF2-SHA256).
   Without the passcode the published files are unreadable. Nothing secret is stored on the device. */
(function () {
  "use strict";
  const LEN = 8, AWAY_MS = 60e3;
  let KEY = null, META = null, opts = {}, fails = 0, waitUntil = 0, entry = "", waiting = null, hiddenAt = 0, busy = false;
  const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const meta = () => META ? Promise.resolve(META) : fetch(opts.meta || "data/vault.json", { cache: "no-cache" }).then(r => r.json()).then(m => (META = m));
  async function derive(code) {
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(code), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", salt: b64(META.salt), iterations: META.iter, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
  }
  const dec = async (key, blob) => new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(blob.iv) }, key, b64(blob.ct)));

  function css() {
    if (document.getElementById("vault-css")) return; const t = opts.theme || {}, s = document.createElement("style"); s.id = "vault-css";
    s.textContent = `#vault{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;background:${t.bg || "#111"};color:${t.ink || "#eee"};font-family:${t.font || "system-ui,sans-serif"}}
#vault h2{font:600 26px/1.2 ${t.display || "inherit"};margin:14px 0 4px}#vault .sub{color:${t.muted || "#999"};font-size:14.5px;min-height:22px;max-width:320px}
#vault .vd{display:flex;gap:10px;margin:20px 0 24px}#vault .vd i{width:12px;height:12px;border-radius:50%;border:1.5px solid ${t.accent || "#ccc"}}#vault .vd i.on{background:${t.accent || "#ccc"}}
#vault .vd.shake{animation:vshake .35s}@keyframes vshake{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
#vault .vk{display:grid;grid-template-columns:repeat(3,72px);gap:14px}#vault .vk button{width:72px;height:72px;border-radius:50%;border:0;background:${t.key || "rgba(255,255,255,.08)"};color:inherit;font:500 26px system-ui,sans-serif;cursor:pointer}
#vault .vk button:active{background:${t.accent || "#ccc"};color:${t.bg || "#111"}}#vault .vk .g{background:none;font-size:15px;color:${t.muted || "#999"}}
#vault .spin{width:22px;height:22px;border:2.5px solid ${t.muted || "#999"};border-top-color:transparent;border-radius:50%;animation:vspin .8s linear infinite;margin:0 auto}@keyframes vspin{to{transform:rotate(360deg)}}
#vault-cover{position:fixed;inset:0;z-index:2147482999;background:${t.bg || "#111"}}`;
    document.head.appendChild(s);
  }
  function draw(msg) {
    css(); let V = document.getElementById("vault"); if (!V) { V = document.createElement("div"); V.id = "vault"; document.body.appendChild(V); }
    V.innerHTML = `${opts.icon ? `<img src="${opts.icon}" width="64" height="64" style="border-radius:16px" alt="">` : ""}<h2>${opts.title || "Locked"}</h2><div class="sub" id="vsub">${msg || `Enter your ${LEN}-digit passcode`}</div>
      <div class="vd" id="vd">${Array.from({ length: LEN }, () => "<i></i>").join("")}</div>
      <div class="vk">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => `<button data-vk="${k}">${k}</button>`).join("")}<span></span><button data-vk="0">0</button><button class="g" data-vk="del" aria-label="Delete">⌫</button></div>
      ${opts.footer ? `<div style="margin-top:22px;font-size:12px;color:${(opts.theme || {}).muted || "#999"}">${opts.footer}</div>` : ""}`;
  }
  const dots = () => document.querySelectorAll("#vd i").forEach((d, i) => d.classList.toggle("on", i < entry.length));
  function bad(msg) { const p = document.getElementById("vd"); if (p) { p.classList.remove("shake"); void p.offsetWidth; p.classList.add("shake"); } entry = ""; dots(); const s = document.getElementById("vsub"); if (s) s.textContent = msg; }
  async function tryCode() {
    if (Date.now() < waitUntil) return bad(`Too many tries. Wait ${Math.ceil((waitUntil - Date.now()) / 1000)} s`);
    busy = true; const s = document.getElementById("vsub"); if (s) s.innerHTML = `<div class="spin"></div>`;
    try { await meta(); const k = await derive(entry); if (await dec(k, META.check) !== "ok") throw 0; KEY = k; fails = 0; entry = ""; busy = false;
      const V = document.getElementById("vault"); if (V) V.remove(); const c = document.getElementById("vault-cover"); if (c) c.remove();
      const w = waiting; waiting = null; if (w) w(); }
    catch (e) { busy = false; if (!(window.crypto && crypto.subtle)) return bad("This browser can't unlock it. Open the link in Chrome or Safari."); fails++;
      if (fails >= 5) { waitUntil = Date.now() + 30e3; fails = 0; bad("Too many tries. Wait 30 s"); } else bad(`Wrong passcode${fails >= 3 ? ` · ${5 - fails} tries left` : ""}`); }
  }
  function press(v) { if (busy || !document.getElementById("vault")) return; if (v === "del") { entry = entry.slice(0, -1); return dots(); } if (entry.length < LEN) { entry += v; dots(); if (entry.length === LEN) setTimeout(tryCode, 80); } }
  document.addEventListener("click", e => { const k = e.target.closest && e.target.closest("[data-vk]"); if (k) { e.stopPropagation(); press(k.dataset.vk); } }, true);
  addEventListener("keydown", e => { if (!document.getElementById("vault")) return; if (/^\d$/.test(e.key)) press(e.key); else if (e.key === "Backspace") press("del"); });
  /* cover the screen in the app switcher, ask again after a minute away */
  document.addEventListener("visibilitychange", () => {
    if (!KEY) return;
    if (document.hidden) { hiddenAt = Date.now(); if (!document.getElementById("vault-cover")) { css(); const c = document.createElement("div"); c.id = "vault-cover"; document.body.appendChild(c); } if (opts.onHide) opts.onHide(); }
    else if (Date.now() - hiddenAt > AWAY_MS) Vault.lock(); else { const c = document.getElementById("vault-cover"); if (c) c.remove(); }
  });
  const Vault = {
    setup(o) { opts = o || {}; return Vault; },
    /* show the keypad and resolve once the right passcode is entered */
    unlock() { return new Promise(res => { waiting = res; entry = ""; draw(); meta().catch(() => bad("Couldn't load. Are you online?")); }); },
    lock() { if (opts.onLock) opts.onLock(); return Vault.unlock().then(() => { if (opts.onUnlock) opts.onUnlock(); }); },
    /* fetch an encrypted JSON file and return the parsed content */
    async load(url) { if (!KEY) await Vault.unlock(); const blob = await (await fetch(url)).json(); return JSON.parse(await dec(KEY, blob)); },
    get unlocked() { return !!KEY; }
  };
  window.Vault = Vault;
})();
