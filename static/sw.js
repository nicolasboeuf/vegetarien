importScripts('/vegetarien/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/vegetarien/_nuxt/118c323b4d3207fe2a9a.js",
    "revision": "d09fae047b4f9875565b2fbe4fa93a57"
  },
  {
    "url": "/vegetarien/_nuxt/5ba320eae7cd3b72b950.js",
    "revision": "8ad7bc094b65f4bbf249a7c156124118"
  },
  {
    "url": "/vegetarien/_nuxt/99432f157c1f39c466f4.js",
    "revision": "7cda726a6884e797feb0bc6d25d7c2d8"
  },
  {
    "url": "/vegetarien/_nuxt/a45a6e0ef7a211a0d9fa.js",
    "revision": "1b2749e8c3f6d1a87d79d91fef3433b8"
  },
  {
    "url": "/vegetarien/_nuxt/a7f1e9bb6c7ba7e0fe82.js",
    "revision": "4999e3e6429cd33ecc904c90e7663905"
  },
  {
    "url": "/vegetarien/_nuxt/db81b1ecea145a774132.js",
    "revision": "d6a748ad62d99b6f1d334e9cd05b390b"
  },
  {
    "url": "/vegetarien/_nuxt/df75f30ac46848718071.js",
    "revision": "73b4e03901fa03ff5875979bb28af16c"
  }
], {
  "cacheId": "vegetarien",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/vegetarien/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/vegetarien/.*'), workbox.strategies.networkFirst({}), 'GET')
