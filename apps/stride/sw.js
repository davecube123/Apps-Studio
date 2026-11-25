// Offline support. Bump VERSION whenever app files change so installed copies update.
const VERSION = "stride-v5";
// All apps share one origin and one cache storage: only ever delete this app's own old caches.
const OWN = "stride-v";
// Every file the app needs offline. Add new files here.
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./lib/leaflet.js", "./lib/leaflet.css", "./fonts/inter-latin-wght-normal.woff2"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith(OWN) && k !== VERSION && k !== TILES).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Map tiles you have seen are kept (up to ~2000) so routes still show a map offline.
const TILES = "stride-tiles";
async function tile(req) {
  const c = await caches.open(TILES), hit = await c.match(req);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok || res.type === "opaque") { c.put(req, res.clone()); c.keys().then(k => { if (k.length > 2000) k.slice(0, k.length - 2000).forEach(x => c.delete(x)); }); }
    return res;
  } catch { return new Response("", { status: 504 }); }
}

// Serve from cache instantly, refresh in the background (same-origin only).
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method === "GET" && url.hostname === "server.arcgisonline.com") { e.respondWith(tile(e.request)); return; }
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith(
    caches.open(VERSION).then(async cache => {
      const cached = await cache.match(e.request, { ignoreSearch: true });
      const fresh = fetch(e.request).then(res => {
        if (res.ok) cache.put(e.request, res.clone());
        return res;
      }).catch(() => cached);
      return cached || fresh;
    })
  );
});
