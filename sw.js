const CACHE_NAME = 'admin-esijil-v17-mobile-header-layout';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './skrg.png',
  './logo-kpm.png',
  './sijil-delima.jpg',
  './sijil-disiplin.jpg',
  './sijil-penceramah-1.jpg',
  './sijil-penceramah-2.jpg',
  './sijil-penceramah-3.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).catch(() => caches.match(event.request))
  );
});
