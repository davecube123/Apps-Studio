// Offline support. Bump VERSION whenever app files change so installed copies update.
const VERSION = "roam-v10";
// Every file the app needs offline. Add new files here.
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./data/thailand.json", "./data/geo.json", "./data/provinces.json", "./lib/leaflet.js", "./lib/leaflet.css", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png", "./fonts/fraunces-latin-soft-normal.woff2", "./fonts/inter-latin-wght-normal.woff2", "./photos/amphawa.jpg", "./photos/ang-thong.jpg", "./photos/ayutthaya.jpg", "./photos/chatuchak.jpg", "./photos/chiang-dao.jpg", "./photos/chiang-khan.jpg", "./photos/chiang-mai.jpg", "./photos/doi-inthanon.jpg", "./photos/doi-suthep.jpg", "./photos/elephant-park.jpg", "./photos/erawan.jpg", "./photos/golden-triangle.jpg", "./photos/grand-palace.jpg", "./photos/hua-hin.jpg", "./photos/kanchanaburi-bridge.jpg", "./photos/khao-sam-roi-yot.jpg", "./photos/khao-sok.jpg", "./photos/khao-yai.jpg", "./photos/koh-chang.jpg", "./photos/koh-kood.jpg", "./photos/koh-lipe.jpg", "./photos/koh-mak.jpg", "./photos/koh-phangan.jpg", "./photos/koh-phayam.jpg", "./photos/koh-samet.jpg", "./photos/koh-tao.jpg", "./photos/lanta.jpg", "./photos/lopburi.jpg", "./photos/mae-hong-son.jpg", "./photos/maeklong-market.jpg", "./photos/nan.jpg", "./photos/pai.jpg", "./photos/pattaya.jpg", "./photos/phang-nga.jpg", "./photos/phanom-rung.jpg", "./photos/phi-phi.jpg", "./photos/phuket.jpg", "./photos/railay.jpg", "./photos/red-lotus-lake.jpg", "./photos/samui.jpg", "./photos/similan.jpg", "./photos/street-food.jpg", "./photos/sukhothai.jpg", "./photos/surin-islands.jpg", "./photos/tarutao.jpg", "./photos/trang-islands.jpg", "./photos/wat-arun.jpg", "./photos/white-temple.jpg", "./photos/thumb/amphawa.jpg", "./photos/thumb/ang-thong.jpg", "./photos/thumb/ayutthaya.jpg", "./photos/thumb/chatuchak.jpg", "./photos/thumb/chiang-dao.jpg", "./photos/thumb/chiang-khan.jpg", "./photos/thumb/chiang-mai.jpg", "./photos/thumb/doi-inthanon.jpg", "./photos/thumb/doi-suthep.jpg", "./photos/thumb/elephant-park.jpg", "./photos/thumb/erawan.jpg", "./photos/thumb/golden-triangle.jpg", "./photos/thumb/grand-palace.jpg", "./photos/thumb/hua-hin.jpg", "./photos/thumb/kanchanaburi-bridge.jpg", "./photos/thumb/khao-sam-roi-yot.jpg", "./photos/thumb/khao-sok.jpg", "./photos/thumb/khao-yai.jpg", "./photos/thumb/koh-chang.jpg", "./photos/thumb/koh-kood.jpg", "./photos/thumb/koh-lipe.jpg", "./photos/thumb/koh-mak.jpg", "./photos/thumb/koh-phangan.jpg", "./photos/thumb/koh-phayam.jpg", "./photos/thumb/koh-samet.jpg", "./photos/thumb/koh-tao.jpg", "./photos/thumb/lanta.jpg", "./photos/thumb/lopburi.jpg", "./photos/thumb/mae-hong-son.jpg", "./photos/thumb/maeklong-market.jpg", "./photos/thumb/nan.jpg", "./photos/thumb/pai.jpg", "./photos/thumb/pattaya.jpg", "./photos/thumb/phang-nga.jpg", "./photos/thumb/phanom-rung.jpg", "./photos/thumb/phi-phi.jpg", "./photos/thumb/phuket.jpg", "./photos/thumb/railay.jpg", "./photos/thumb/red-lotus-lake.jpg", "./photos/thumb/samui.jpg", "./photos/thumb/similan.jpg", "./photos/thumb/street-food.jpg", "./photos/thumb/sukhothai.jpg", "./photos/thumb/surin-islands.jpg", "./photos/thumb/tarutao.jpg", "./photos/thumb/trang-islands.jpg", "./photos/thumb/wat-arun.jpg", "./photos/thumb/white-temple.jpg"];

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
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
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
