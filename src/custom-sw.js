self.importScripts('/scripts/idb.js', '/scripts/idbApp.js')

// Service Worker

// Constants
const CACHE_APPSHELL = 'zoom-appshell-cache-v1'
const CACHE_IMAGES_FAVICON = 'zoom-images-favicon-cache'
const CACHE_IMAGES_API = 'zoom-images-api-cache'
const FAVICON_API_URL = new URL('https://api.statvoo.com/favicon/')
// cache/db limits
const LIMIT_IDB_HD_COUNTRY = 5
const LIMIT_IDB_HD_SOURCES = 10
//API
const NEWSAPI = 'https://newsapi.org'
const ENDPOINT_SOURCES = '/v2/sources'
const ENDPOINT_HEADLINES = '/v2/top-headlines/'

// Whitelisted caches
const appCaches = [CACHE_APPSHELL, CACHE_IMAGES_FAVICON, CACHE_IMAGES_API]

// Cache static assets during install to make resourcs available
self.addEventListener('install', function(event) {
  event.waitUntil(
    cacheAssets().then(() => {
      self.skipWaiting()
    })
  );
});

// Delete unused caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      // Delete old version of cache
      return Promise.all(
        cacheNames
          .filter(name => name.startsWith("zoom-") && !appCaches.includes(name))
          .map(name => caches.delete(name))
      )
    }).then(() => self.clients.claim())
  );
});

// self.addEventListener('message', event => {
// 	if (event.data.action === 'skipWaiting') {
// 		return self.skipWaiting()
// 	}
// })


// ************************ Helpers ***************************//
const cacheAssets = () => {
  return caches.open(CACHE_APPSHELL)
  .then(cache => {
    // Get the assets manifest so we can see what our js file is named
    // This is because webpack hashes it
    fetch("asset-manifest.json")
      .then(response => (response.json()))
      .then(assets => {
        // Open a cache and cache our files
        const webpackAssets = Object.values(assets).filter(asset => !asset.includes('.map'))
        const staticAssets = [
          "/",
          "/index.html",
          "/assets/placeholder-source.png",
          "/assets/placeholder-headlines.png",
          "/scripts/idb.js",
          "/scripts/idbApp.js",
          "https//fonts.googleapis.com/css?family=Libre+franklin:300i,300,400,600"
        ]
        return cache.addAll(staticAssets.concat(webpackAssets))
    });
  })
}

const addToCache = (cacheName, request, response) => {
  caches.open(cacheName).then(cache => cache.put(request, response))
}

const responseAsJson = data => {
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
}

const responseOffline = () => {
  const offlineMsg = {
    status: 'offline',
    code: 'AppOffline',
    message: 'You seem to be offline.'
  }
  return responseAsJson(offlineMsg)
}

// ************************ endHelpers ***************************//

self.addEventListener('fetch', function(event) {
  const requestUrl = new URL(event.request.url)

  // TODO: custom-sw & manifest.json is still fetched from network cuz of no cache response

  // For all react router routes, let index.html handle it
  if(requestUrl.origin === location.origin){
    // TODO: also serve index.html for 404 routes
    if((/^\/(?:settings|sources|favorites)(?:\/.*)?/).test(requestUrl.pathname)){
      event.respondWith( caches.match('/index.html'))
      return ;
    }
  }
  // Handle source favicons/images fetch -> store in cache
  if(requestUrl.hostname === FAVICON_API_URL.hostname){
    event.respondWith(faviconHandler(event.request, requestUrl))
    return ;
  }

  // Handle headlines images fetch -> store in cache
  if((/.*\.(?:png|jpg|jpeg|svg|gif)/g).test(requestUrl.pathname)){
    event.respondWith(apiImagesHandler(event.request, requestUrl))
    return ;
  }

  // Handle News Api json response -> store in indexedDB
  if(requestUrl.origin === NEWSAPI){
    if(requestUrl.pathname === ENDPOINT_HEADLINES){
      event.respondWith(apiHeadlinesHandler(event.request, requestUrl.search))
      return ;
    }
    if(requestUrl.pathname === ENDPOINT_SOURCES){
      event.respondWith(apiSourcesHandler(event.request, requestUrl.search))
      return ;
    }
  }

  // Default Fetch Handler -> Cache First with Network fallback
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request)

      // TODO 4 - Add fetched files to the cache

    }).catch(function(error) {

      // TODO 6 - Respond with custom offline page

    })
  );
});

const apiHeadlinesHandler = (request, queryString) => {
  console.log('SW Handling api request ', request)
  // Uses IDB then Network
  if(queryString.startsWith('?country')){
    const iso = queryString.split('=')[1]
    return idbApp.get('headlines-country', iso)
      .then(response => {
        // NOTE: if no stored response, it returns undefined
        if(response){
          //Query api for fresh data 15mins interval
          if(Math.floor(Date.now()/900000) > Math.floor(response.time/900000)){
              // Update headlines
              console.log('Updating from network, data for idb')
              return fetchAndStore(request, 'headlines-country', 'update', storeByCountry, { iso })
                .catch(() => { 
                  console.log('Failed to fetch, use idb instead')
                  return responseAsJson(response) })
          }
          console.log('retrieving less than 15mins stale data from idb')
          return responseAsJson(response)
        }
        // Store new headlines
        console.log('Sorry not in idb, will fetch from network')
        return fetchAndStore(request, 'headlines-country', 'add', storeByCountry, { iso })
          .catch(() => {
            console.log('Seems to be offline')
            return responseOffline()
          })
      })
      .catch(() => {
        console.log('Unable to access idb, unsupported')
        return fetch(request)
      })
  }
  if(queryString.startsWith('?sources')){
    // Use Network First, then IDB
    const sources = queryString.match(/^\?sources=([a-z,-]+)[&\/]?/)[1].split(',')
    return fetchAndStore(request, 'headlines-sources', 'update', storeBySources, { sources })
      .catch(() => {// offline?
        // If error in this code, forces it to the last catch block
        return idbApp.getbySources('headlines-sources', sources)
          .then(sources => {
            if(sources.length !== 0){
              const sorted = sources.sort((a, b) => (b.time - a.time))
              const articles =  sorted.reduce((headlines, source) => {
                headlines.push(...source.articles)
                return headlines
              },[])
              // Send found data from requested sources if any
              return responseAsJson({status: 'ok', totalResults:articles.length, articles})
            }
            //Possibly offline at this point
            console.log('Will return offline response..')
            return responseOffline()
          })
          .catch(() => console.log('Fetch sources: Unable to access idb, unsupported'))
      })
  }

}

const apiSourcesHandler = (request) => {
  // TODO: Update idb after an interval -> 2 days
  // IDB first then network
  return idbApp.getAll('sources-list')
    .then(sources => {
      if(sources.length !== 0){
        const response = { status: 'ok', totalResults: sources.length, sources }
        return responseAsJson(response)
      }
      console.log('No stored sources, fetching from network')
      return fetchAndStore(request, 'sources-list', 'update', storeSouresList )
        .catch(() => {
          console.log('Seems to be offline')
          return responseOffline()
        })
    })
    .catch(() => {
      console.log('can not connect')
      return fetch(request)
    })
}

const faviconHandler = (request, requestUrl) => {
  const storageUrl = requestUrl.search.match(/^\?url=(.*?)&size/)[1]
  return staleWhileRevalidate(request, CACHE_IMAGES_FAVICON, storageUrl)
}

const apiImagesHandler = (request, requestUrl) => {
  console.log('Retrieving images..')
  return caches.match(request)
    .then(response => {
      return response || fetch(request)
        .then(response => {
          // Some websites disallows hotlinking resulting to 403 error
          // Fetch has default no-cors mode enabled which returns opaque response
          // and unable to look through the response to determine 403 errors
          // Caveat: Hence both valid images and failed images are cached
          // Also sizes of cached opaque responses are significantly padded per browser
          // TODO: Cache only valid image response, look for solution for cors problem
          const cloned = response.clone()
          addToCache(CACHE_IMAGES_API, request, cloned)

          return response
        }, failedNetworkHandler)
    })
    .catch(failedNetworkHandler)
}

const failedNetworkHandler = () => {
  console.log('Can not retrieve source image, fallback dummy')
  return caches.match('/assets/placeholder-headlines.png')
}

// Runtime caching strategies
// Return cached response instantly otherwise update cache with networked response
// and use updated cache for next fetch request/page load.
// Note: Updates are shown on second refresh and not on reload
const staleWhileRevalidate = (request, cacheName, storageUrl) => {
  return caches.match(request)
    .then(cacheResponse => {
      const fetchPromise = fetch(request)
        .then(networkResponse => {
          const clonedResponse = networkResponse.clone()
          caches.open(cacheName)
          .then(cache => {
            cache.put(request, clonedResponse)
          })
          return networkResponse
        })
        return cacheResponse || fetchPromise
          .catch(() => caches.match('/assets/placeholder-source.png'))
    })
}

//********************IDB Store Strategies************************************/
const storeBySources = (headlines, storeName, method, options) => {
  const grouped = headlines.articles.reduce((grouped, headline) => {
    const sid = headline.source.id
    if (grouped[sid]) { grouped[sid].push(headline) }
    else { grouped[sid] = [headline] }
    return grouped
  }, {})
  options.sources.forEach(source => {
    const headlines = {
      sid: source,
      time: Date.now(),
      articles: grouped[source]
    }
    return idbApp[method](storeName, headlines)
  })
}

const storeByCountry = (headlines, storeName, method, options) => {
  if(options.hasOwnProperty('iso')) { headlines.iso = options.iso }
  if(options.hasOwnProperty('sid')) { headlines.sid = options.sid }
  headlines.time = Date.now()
  return idbApp[method](storeName, headlines)
}

const storeSouresList  = (json, storeName, method) => {
  json.sources.forEach(source => {
    idbApp[method](storeName, {id: source.id, name: source.name})
  })
}
//********************END IDB Store Strategies*********************************/


// Helper to fetch and store json response from news API
const fetchAndStore = (request, storeName, method, jsonMapper, options) => {
  return fetch(request)
    .then(response => {
      response.clone().json()
        .then(json => {
          if(json.status === 'ok'){
            return jsonMapper(json, storeName, method, options)
          }
        })
      return response
    })
}
