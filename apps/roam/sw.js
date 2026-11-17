// Offline support. Bump VERSION whenever app files change so installed copies update.
const VERSION = "roam-v7";
const TILES = "roam-tiles";
// Every file the app needs offline. Add new files here.
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./data/thailand.json", "./data/geo.json", "./lib/leaflet.js", "./lib/leaflet.css", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png", "./fonts/fraunces-latin-soft-normal.woff2", "./fonts/inter-latin-wght-normal.woff2", "./photos/ayutthaya.jpg", "./photos/chiang-mai.jpg", "./photos/doi-suthep.jpg", "./photos/erawan.jpg", "./photos/grand-palace.jpg", "./photos/khao-sok.jpg", "./photos/koh-tao.jpg", "./photos/lanta.jpg", "./photos/pai.jpg", "./photos/phi-phi.jpg", "./photos/phuket.jpg", "./photos/railay.jpg", "./photos/samui.jpg", "./photos/street-food.jpg", "./photos/sukhothai.jpg", "./photos/wat-arun.jpg", "./photos/white-temple.jpg", "./photos/thumb/ayutthaya.jpg", "./photos/thumb/chiang-mai.jpg", "./photos/thumb/doi-suthep.jpg", "./photos/thumb/erawan.jpg", "./photos/thumb/grand-palace.jpg", "./photos/thumb/khao-sok.jpg", "./photos/thumb/koh-tao.jpg", "./photos/thumb/lanta.jpg", "./photos/thumb/pai.jpg", "./photos/thumb/phi-phi.jpg", "./photos/thumb/phuket.jpg", "./photos/thumb/railay.jpg", "./photos/thumb/samui.jpg", "./photos/thumb/street-food.jpg", "./photos/thumb/sukhothai.jpg", "./photos/thumb/wat-arun.jpg", "./photos/thumb/white-temple.jpg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== TILES).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // Map tiles you have already seen stay available offline (kept to the last ~600).
  if (url.hostname === "tile.openstreetmap.org") {
    e.respondWith(caches.open(TILES).then(async cache => {
      const hit = await cache.match(e.request); if (hit) return hit;
      try { const res = await fetch(e.request); if (res.ok || res.type === "opaque") { cache.put(e.request, res.clone()); cache.keys().then(k => { if (k.length > 600) k.slice(0, k.length - 600).forEach(r => cache.delete(r)); }); } return res; }
      catch { return new Response("", { status: 504 }); }
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // Serve from cache instantly, refresh in the background (same-origin only).
  e.respondWith(
    caches.open(VERSION).then(async cache => {
      const cached = await cache.match(e.request, { ignoreSearch: true });
      const fresh = fetch(e.request).then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; }).catch(() => cached);
      return cached || fresh;
    })
  );
});
