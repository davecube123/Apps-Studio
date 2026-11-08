// Offline support. Bump VERSION whenever app files change so installed copies update.
const VERSION = "song-of-songs-v2";
// Every file the app needs offline. Add new files here.
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./data/song.json", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png", "./fonts/cormorant-garamond-latin-wght-normal.woff2", "./fonts/cormorant-garamond-latin-wght-italic.woff2", "./fonts/cormorant-garamond-latin-ext-wght-normal.woff2", "./fonts/cormorant-garamond-latin-ext-wght-italic.woff2", "./fonts/eb-garamond-latin-wght-normal.woff2", "./fonts/eb-garamond-latin-wght-italic.woff2", "./fonts/eb-garamond-latin-ext-wght-normal.woff2", "./fonts/eb-garamond-latin-ext-wght-italic.woff2", "./fonts/frank-ruhl-libre-hebrew-wght-normal.woff2"];

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

// The page and the text come from the network when online, so a correction shows the first time the
// app is opened; the stored copies are used offline. Fonts, icons and the manifest come from the cache.
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  const fresh = e.request.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith(".html") || url.pathname.endsWith(".json");
  if (fresh) {
    e.respondWith(
      fetch(e.request, { cache: "no-cache" }).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
        return res;
      }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || (e.request.mode === "navigate" ? caches.match("./index.html") : undefined)))
    );
    return;
  }
  e.respondWith(
    caches.open(VERSION).then(async cache => {
      const cached = await cache.match(e.request, { ignoreSearch: true });
      const net = fetch(e.request).then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; }).catch(() => cached);
      return cached || net;
    })
  );
});
