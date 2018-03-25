// service-worker.js

// Flag for enabling cache in production
// var doCache = false;

// var CACHE_NAME = 'pwa-app-cache';

// // Delete old caches
// self.addEventListener('activate', event => {
//     const currentCachelist = [CACHE_NAME];
//     event.waitUntil(
//         caches.keys()
//         .then(keyList =>
//             Promise.all(keyList.map(key => {
//             if (!currentCachelist.includes(key)) {
//                 return caches.delete(key);
//             }
//             }))
//         )
//     );
// });

// // This triggers when user starts the app
// self.addEventListener('install', function(event) {
//     if (doCache) {
//         event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(function(cache) {
//             fetch('asset-manifest.json') //manifest.json
//                 .then(response => {
//                 response.json();
//                 })
//                 .then(assets => {
//                 // We will cache initial page and the main.js
//                 // We could also cache assets like CSS and images
//                 const urlsToCache = [
//                     '/',
//                     assets['index.js']
//                 ];
//                 cache.addAll(urlsToCache);
//                 console.log('cached by sw.js');
//                 })
//             })
//         );
//     }
// });

// // Here we intercept request and serve up the matching files
// self.addEventListener('fetch', function(event) {
//     if (doCache) {
//         event.respondWith(
//         caches.match(event.request).then(function(response) {
//             return response || fetch(event.request);
//         })
//         );
//     }
// });


// importScripts('/workbox-sw.js');
//self.workbox.logLevel = self.workbox.LOG_LEVEL.verbose;

const w = new self.WorkboxSW();

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

w.precache([]);

// app-shell
w.router.registerRoute('/', w.strategies.networkFirst());
w.router.registerRoute(/^\/$|home|profile|work|contact/, w.strategies.networkFirst());

// webfont-cache
const webFontHandler = w.strategies.cacheFirst({
  cacheName: 'webfont-cache',
  cacheExpiration: {
    maxEntries: 20
  },
  cacheableResponse: { statuses: [0, 200] }
});
w.router.registerRoute(/https:\/\/fonts.googleapis.com\/.*/, webFontHandler);
w.router.registerRoute(/https:\/\/fonts.gstatic.com\/.*/, webFontHandler);
w.router.registerRoute(/https:\/\/use.fontawesome.com\/.*/, webFontHandler);

// get-urls-cache
// const API = /https:\/\/us-central1-joanne-lee.cloudfunctions.net\/getUrls\/.*/;
// const apiHandler = w.strategies.networkFirst({
//   cacheName: 'get-urls-cache'
// });
// w.router.registerRoute(API, apiHandler);

// work-images-cache
// w.router.registerRoute(/https:\/\/storage.googleapis.com\/joanne-lee.appspot.com\/.*/,
//   w.strategies.cacheFirst({
//     cacheName: 'work-images-cache',
//     cacheExpiration: {
//       maxEntries: 60
//     },
//     cacheableResponse: { statuses: [0, 200] }
//   })
// );