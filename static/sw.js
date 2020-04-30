importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/456bd33d0e7be80c01e7.js",
    "revision": "d493c4022bd12b79d4f942749eb18693"
  },
  {
    "url": "/_nuxt/48a0f37ee6967ca25dda.js",
    "revision": "08a61d35e8413c9d432d2c12d5db1f3e"
  },
  {
    "url": "/_nuxt/4c4bcbd4d82b8959c84e.js",
    "revision": "f6bf81f085052ec3f6e2ae3a8a0d183d"
  },
  {
    "url": "/_nuxt/4f5bc0639a8f44618c13.js",
    "revision": "21818da314d28ebba4361b368dda39d9"
  },
  {
    "url": "/_nuxt/79cbe21a6788246f2615.js",
    "revision": "ce5c8e5e6d387950ddcdd25b27fc59d6"
  },
  {
    "url": "/_nuxt/87263f972888c526709f.js",
    "revision": "b07f8f09206d3e317f1505f7973435e6"
  },
  {
    "url": "/_nuxt/984f4ab471ef6ceba1db.js",
    "revision": "a1ac391dbc4d06f709cedb355e86e81c"
  }
], {
  "cacheId": "vegetarien",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
