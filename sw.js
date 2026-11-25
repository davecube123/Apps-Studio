// Apps Studio hub: keeps the hub page itself available offline.
// Each app under apps/<name>/ has its own service worker (a narrower scope), which takes over once it is installed.
// Bump VERSION whenever the hub's files change.
const VERSION = "hub-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];
const BASE = new URL("./", self.location).pathname;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("hub-") && k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const OFFLINE_APP = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Not saved yet</title>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#16151a;color:#eee;font:17px/1.5 system-ui,sans-serif;padding:24px;box-sizing:border-box;text-align:center}
div{max-width:420px}h1{font-size:22px}a{color:#ff7b78}</style></head><body><div><h1>This app isn't saved on this phone yet</h1>
<p>You're offline, and this app hasn't been opened here with a connection before.</p>
<p>When you're back online, open <a href="${BASE}">Apps Studio</a> and tap <b>Save all apps for offline</b>, or open this app once.</p></div></body></html>`;

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  // App pages whose own worker isn't installed yet: go to the network, and explain if offline.
  if (url.pathname.startsWith(BASE + "apps/")) {
    if (e.request.mode === "navigate") e.respondWith(fetch(e.request).catch(() => new Response(OFFLINE_APP, { headers: { "Content-Type": "text/html; charset=utf-8" } })));
    return;
  }
  // The hub itself: serve from cache instantly, refresh in the background.
  e.respondWith(
    caches.open(VERSION).then(async cache => {
      const cached = await cache.match(e.request, { ignoreSearch: true });
      const fresh = fetch(e.request).then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; }).catch(() => cached || Response.error());
      return cached || fresh;
    })
  );
});
