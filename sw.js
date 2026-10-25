const CACHE_NAME = 'baca-harian-v1';
const urlsToCache = [
'./',
'./index.html',
'./manifest.json',
'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js'
];
self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))
);
});
self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response => {
if (response) {
return response;
}
return fetch(event.request);
})
);
});
