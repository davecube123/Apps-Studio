// Offline support. Bump VERSION whenever app files change so installed copies update.
const VERSION = "forge-v2";
// Every file the app needs offline. Add new files here.
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png", "./fonts/fraunces-latin-soft-normal.woff2", "./fonts/inter-latin-wght-normal.woff2", "./data/content.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// The app itself (the page and the tales) comes from the network when online, so a fix shows the first time
// it is opened; the stored copy is used only offline. Icons and the manifest are served from cache.
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  const isPage = e.request.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith(".html") || url.pathname.endsWith(".json");
  if (isPage) {
    e.respondWith(
      fetch(e.request, { cache: "no-cache" }).then(res => {
        if (res.ok) caches.open(VERSION).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("./index.html")))
    );
    return;
  }
  e.respondWith(
    caches.open(VERSION).then(async cache => {
      const cached = await cache.match(e.request, { ignoreSearch: true });
      const fresh = fetch(e.request).then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; }).catch(() => cached);
      return cached || fresh;
    })
  );
});
