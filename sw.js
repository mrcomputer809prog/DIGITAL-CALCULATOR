const CACHE_NAME = 'calc-cache-v3'; // Version 3 (taake naya cache bane)
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// Jab pehli dafa website khule, toh saari files ko phone/PC mein save kar lo
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Jab internet na ho, toh save ki hui files (cache) se website chalao
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Agar file phone mein save hai, toh wahan se do
        if (response) {
          return response;
        }
        // Warna internet se laane ki koshish karo
        return fetch(event.request);
      })
  );
});

// Purane cache ko delete karo taake phone mein space kam ho
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});