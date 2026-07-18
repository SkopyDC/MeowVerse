const CACHE = "meowverse-v13";
const ASSETS = ["/", "/index.html", "/manifest.webmanifest", "/assets/icon.svg", "/assets/v3/island-terrain.png", "/assets/v3/arena.png", "/assets/v3/pack-house.png", "/assets/v3/pond.png", "/assets/v3/dairy.png", "/assets/v3/order-van.png", "/assets/v3/cat-jiskra.png", "/assets/v3/cat-kapka.png", "/assets/v3/cat-listka.png", "/legacy/", "/legacy/styles.css", "/legacy/game.js", "/legacy/engine.js"];

self.addEventListener("install", (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS))));
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))));
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(async (cached) => {
    if (cached) return cached;
    const response = await fetch(event.request);
    if (response.ok && new URL(event.request.url).origin === location.origin) {
      const cache = await caches.open(CACHE);
      cache.put(event.request, response.clone());
    }
    return response;
  }));
});
