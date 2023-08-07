// You can change the number on the end of the site to refresh the cache
const CACHE_NAME = 'my-site-v1';

// add all your files in the CACHE_URLS
const CACHE_URLS = ['/', 'index.html',
  'manifest.json',
  'style.css',
  '404.html',
  'images/android-chrome-512x512.png',
  'kids.html',
  'holding.html',
  'bookings.html',
  'animals.html',
  'about.html',
  'about.css',
  '/Zoo/background.jpg',
  '/Zoo/tiger.jpg',
  '/Zoo/45694680321_a9cef8b08b_o.jpg',
  '/Zoo/48691707483_6d2f001728_o.jpg',
  '/Zoo/48689287562_7149393f24_o.jpg',
  '/Zoo/45694679311_1816ee8267_o.jpg',
  '/Zoo/48689287562_7149393f24_o.jpg',
  '/Zoo/2back.jpg',
  '/Zoo/50351645371_afaeb34aae_o.jpg',
  '/Zoo/50350942878_c22018aa50_o.jpg',
  '/Zoo/50350942113_81f4769775_o.jpg',
  '/Zoo/50351799912_2886344789_o.jpg'

  // add all your files in here, in the correct folders. No need to add this file
];
//DO NOT change any of the code below

self.addEventListener("install", function (event) {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log("Cache opened");
        return cache.addAll(CACHE_URLS);
      })
  );
});


self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName.startsWith('my-site-') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log(`Return ${event.request.url} from cache`);
        return response;
      }
      console.log(`Fetch ${event.request.url} from network`);
      return fetch(event.request);
    })
  );
});
