// Service Worker for Newnham College Garden Collections
// Change CACHE_VERSION when you update plants.csv or any other file
const CACHE_VERSION = 'nc-gardens-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './plants.csv',
  './manifest.json',
  './images/roaslind_franklin_garden.png',
  './images/Four_seasons_garden.png',
  './images/Old_labs.png',
  './images/Cafe_courtyard_RFB.png',
  './images/formal_garden_yew_hedge.png',
  './images/mound_and_square.png',
  './images/kennedy.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js'
];

// Install — cache all core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate — delete old caches when a new version is deployed
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_VERSION)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — serve from cache first, fall back to network
// For plants.csv, try network first so edits show up quickly
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network-first for the CSV (so data updates are picked up)
  if (url.pathname.endsWith('plants.csv')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
