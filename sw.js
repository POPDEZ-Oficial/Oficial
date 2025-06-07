const CACHE_NAME = 'popdez-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './images/LOGO 1.png',
  './images/logo 2.png',
  './images/DESKTOP.png',
  './images/mobile.png',
  './images/background4.png',
  './images/FOTO.png',
  './images/processed_image (23).png'
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
      .then(response => response || fetch(event.request))
  );
}); 