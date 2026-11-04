// Offline support. Bump VERSION whenever app files change so installed copies update.
const VERSION = "commonplace-v9";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png", "./fonts/newsreader.woff2", "./fonts/newsreader-italic.woff2", "./data/sample-tao-te-ching.json"];
// The EPUB/PDF parsers are kept offline once fetched.
const RUNTIME_HOSTS = ["cdnjs.cloudflare.com"];

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

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // App files: serve from cache instantly, refresh in the background.
  if (url.origin === location.origin) {
    e.respondWith(
      caches.open(VERSION).then(async cache => {
        const cached = await cache.match(req, { ignoreSearch: true });
        const fresh = fetch(req).then(res => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        }).catch(() => cached);
        return cached || fresh;
      })
    );
    return;
  }

  // Libraries: cache first.
  if (RUNTIME_HOSTS.includes(url.hostname)) {
    e.respondWith(
      caches.open(VERSION).then(async cache => {
        const cached = await cache.match(req);
        if (cached) return cached;
        const res = await fetch(req);
        if (res.ok || res.type === "opaque") cache.put(req, res.clone());
        return res;
      })
    );
  }
});
