const CACHE_NAME = 'baca-harian-v2'; // UBAH VERSI INI SETIAP KALI UPDATE

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './styles.css',
  './app.js'
];

// 1. Install Event: Simpan aset baru
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Memaksa SW baru segera aktif
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Event: Hapus cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Hapus cache versi sebelumnya
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
