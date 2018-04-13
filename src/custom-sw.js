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
// importScripts('./workbox-sw.prod.v3.0.0.js');
//self.workbox.logLevel = self.workbox.LOG_LEVEL.verbose;

const w = new self.WorkboxSW();

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

w.precache([]);

// Set logs level to `debug` to view all logs
// w.core.setLogLevel(w.core.LOG_LEVELS.debug);

// app-shell
w.router.registerRoute('/', w.strategies.networkFirst());
w.router.registerRoute(/^\/$|home|profile|work|contact/, w.strategies.networkFirst());

// dynamic-images

w.router.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/g, imagesHandler);
// /\.(?:png|jpg|gif)$/

// Strategy for fallback image
// w.router.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/, ({ event }) => {
//   return imagesHandler.handle({event})
//           .catch(imagesFallbackHandler)
// });


w.router.registerRoute(/https:\/\/fonts.googleapis.com\/.*/, webFontHandler);
w.router.registerRoute(/https:\/\/fonts.gstatic.com\/.*/, webFontHandler);
w.router.registerRoute(/https:\/\/use.fontawesome.com\/.*/, webFontHandler);


w.router.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  webFontHandler
);

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

// Runtime caching route-match handlers

const imagesHandler = w.strategies.cacheFirst({
  cacheName: 'api-images-cache',
  plugins: [
    new workbox.expiration.Plugin({
      //cache only 50 images
      maxEntries: 50,
      // cache max 7 days
      maxAgeSeconds: 24 * 60 * 60 * 7
    })
  ]
  // cacheExpiration: {
  //   maxEntries: 50
  // }
});

// webfont-cache
const webFontHandler = w.strategies.cacheFirst({
  cacheName: 'webfont-cache',
  plugins: [
    new workbox.expiration.Plugin({
      //cache only 30 entries
      maxEntries: 30,
      // cache max 7 days
      maxAgeSeconds: 24 * 60 * 60 * 7
    }),
    new workbox.cacheableResponse.Plugin({
      statuses: [0, 200],
      headers: { 'X-Is-Cacheable': 'true',},
    })
  ]
});


//Fallbacks
// Retrieve Image Placehoder from cache/idb
// Strategy I plan to do is retrieve cached news source image instead
// then fallback to dummy image if not present
const imagesFallbackHandler = (err) => {
  console.error('Failed to retrieve image from url')
  return caches.match('/dummy-image.png');
}