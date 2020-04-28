importScripts('/vegetarien/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/vegetarien/_nuxt/0353f4a06498d89a0d56.js",
    "revision": "1008bb2a212c14dd357c969bd2117b2f"
  },
  {
    "url": "/vegetarien/_nuxt/118c323b4d3207fe2a9a.js",
    "revision": "d09fae047b4f9875565b2fbe4fa93a57"
  },
  {
    "url": "/vegetarien/_nuxt/4b10822c4a1e14a9809d.js",
    "revision": "6cad21c0c9723d02c5ab9e9b573efe00"
  },
  {
    "url": "/vegetarien/_nuxt/a7f1e9bb6c7ba7e0fe82.js",
    "revision": "4999e3e6429cd33ecc904c90e7663905"
  },
  {
    "url": "/vegetarien/_nuxt/b0edbf54c8cfa42dc5f3.js",
    "revision": "a9f406ecf91a49237c3b036b4b09f2e5"
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
