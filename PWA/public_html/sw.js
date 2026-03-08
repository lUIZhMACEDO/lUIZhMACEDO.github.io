const CACHE_NAME = 'weather-app-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/css/Mobile.css',
    '/images/search.jpg',
    '/script/WeatherApi.js',
    '/script/script.js',
    '/script/app.js',
    '/PWA/Favicon/apple-touch-icon.png',
    '/PWA/Favicon/favicon-32x32.png',
    '/PWA/Favicon/favicon-16x16.png',
    '/offline.html'
];

// Install event - caching important assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error("Failed to open cache: ", error);
            })
    );
    self.skipWaiting(); // Activate this Service Worker immediately
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        clients.claim(), // Take control of all clients immediately
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // return the cached response if found
                }
                return fetch(event.request).then(fetchResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, fetchResponse.clone()); // cache the new fetched response
                        return fetchResponse;
                    });
                });
            }).catch(error => {
                console.error('Fetch failed; returning offline page instead.', error);
                return caches.match('/offline.html');
            })
    );
});