const CACHE = "meowverse-v12";
const ASSETS = ["/", "/index.html", "/manifest.webmanifest", "/assets/icon.svg", "/assets/island/island-ground-v2.png", "/assets/island/arena.png", "/assets/island/pack-house.png", "/assets/island/dairy.png", "/assets/island/workshop.png", "/assets/island/pond.png", "/assets/island/order-van.png", "/legacy/", "/legacy/styles.css", "/legacy/game.js", "/legacy/engine.js"];

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
