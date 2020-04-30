importScripts('/vegetarien/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/vegetarien/_nuxt/48a0f37ee6967ca25dda.js",
    "revision": "08a61d35e8413c9d432d2c12d5db1f3e"
  },
  {
    "url": "/vegetarien/_nuxt/4c4bcbd4d82b8959c84e.js",
    "revision": "f6bf81f085052ec3f6e2ae3a8a0d183d"
  },
  {
    "url": "/vegetarien/_nuxt/87263f972888c526709f.js",
    "revision": "b07f8f09206d3e317f1505f7973435e6"
  },
  {
    "url": "/vegetarien/_nuxt/95b4f80da40a9ad12890.js",
    "revision": "ab4880002f716b471ae412dd68b9c7b8"
  },
  {
    "url": "/vegetarien/_nuxt/984f4ab471ef6ceba1db.js",
    "revision": "a1ac391dbc4d06f709cedb355e86e81c"
  },
  {
    "url": "/vegetarien/_nuxt/9af816ca8d50c67dda19.js",
    "revision": "58331854d0c88d5216531179499ea433"
  },
  {
    "url": "/vegetarien/_nuxt/9b123d23a0f33b7c59ea.js",
    "revision": "b2c78bfdf9c0db850dbc04ae97f81b2d"
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
