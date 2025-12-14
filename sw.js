const CACHE_NAME = 'brain-arcade-v7'; // IMPORTANT: Increment this (v6 -> v7) to trigger the update!
const ASSETS = [
  './',
  './index.html',
  './arcade.html',
  './cosmic.html',
  './manifest.json',
  './icon194.png',
  './icon.png',
  './icon512.png',
  './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Poppins:wght@400;600&display=swap'
];

// 1. INSTALL EVENT
self.addEventListener('install', (event) => {
  // Force this new service worker to become the active one immediately
  self.skipWaiting(); 

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. ACTIVATE EVENT
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)) // This clears the old cache
      );
    })
  );
  // Force the service worker to take control of the page immediately
  self.clients.claim();
});

// 3. FETCH EVENT (Network First Strategy)
// This tries to get the fresh file from the internet first.
// If online: It serves the fresh file AND updates the cache.
// If offline: It falls back to the cache.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If we got a valid response from network, update the cache with it
        // so we have the latest version for next time we are offline.
        if (networkResponse && networkResponse.status === 200) {
           const responseClone = networkResponse.clone();
           caches.open(CACHE_NAME).then((cache) => {
             cache.put(event.request, responseClone);
           });
        }
        return networkResponse;
      })
      .catch(() => {
        // If network fails (offline), return from cache
        return caches.match(event.request);
      })
  );
});
