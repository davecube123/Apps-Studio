// Offline support. Bump VERSION whenever app files change so installed copies update.
const VERSION = "lifeline-v4";
// All apps share one origin and one cache storage: only ever delete this app's own old caches.
const OWN = "lifeline-v";
// Every file the app needs offline. Add new files here.
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./data/lifeline.json", "./data/visuals.json", "./img/aed-pads.svg", "./img/bleeding-pressure.svg", "./img/burn-cool.svg", "./img/choking-adult.svg", "./img/choking-infant.svg", "./img/cpr-hands.svg", "./img/cpr-infant.svg", "./img/epipen.svg", "./img/heart-attack-rest.svg", "./img/heat-cooling.svg", "./img/jellyfish-vinegar.svg", "./img/nosebleed.svg", "./img/primary-check-flow.svg", "./img/recovery.svg", "./img/seizure.svg", "./img/shock.svg", "./img/sling.svg", "./img/snakebite.svg", "./img/spinal-hold.svg", "./img/stroke-befast.svg", "./img/tourniquet.svg", "./img/wound-packing.svg", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith(OWN) && k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Serve from cache instantly, refresh in the background (same-origin only).
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
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
