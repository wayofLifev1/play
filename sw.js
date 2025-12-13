const CACHE_NAME = 'brain-arcade-v6';
const ASSETS = [
  './',
  './index.html',// IMPORTANT: Rename your main file to index.html
  './arcade.html',
  './cosmic.html',
  './manifest.json',
  './icon194.png',
  './icon.png',
  './icon512.png',// Make sure this file exists
  './icon-512.png',      // Make sure this file exists
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Poppins:wght@400;600&display=swap'
];

// 1. INSTALL EVENT (Cache the files)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. ACTIVATE EVENT (Clean up old caches)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
});

// 3. FETCH EVENT (Serve from cache, fallback to network)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached file if found, otherwise fetch from network
      return cachedResponse || fetch(event.request);
    })
  );
});
