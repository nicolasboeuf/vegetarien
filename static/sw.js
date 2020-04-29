importScripts('/vegetarien/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/vegetarien/_nuxt/118c323b4d3207fe2a9a.js",
    "revision": "d09fae047b4f9875565b2fbe4fa93a57"
  },
  {
    "url": "/vegetarien/_nuxt/23e1838c3320a168b37b.js",
    "revision": "e95963ad6d510cfd502a4e7c84677617"
  },
  {
    "url": "/vegetarien/_nuxt/277d36eaf97938e8982c.js",
    "revision": "1e8d73005ef4f546cb7c1e87e3ca7b15"
  },
  {
    "url": "/vegetarien/_nuxt/32b2af894972336b7fa7.js",
    "revision": "dfa26058bf81f6f508139efd75c15b06"
  },
  {
    "url": "/vegetarien/_nuxt/3fbbadfb60e0746faac9.js",
    "revision": "bdcd48ed39d74b0c509e00a48b90e11c"
  },
  {
    "url": "/vegetarien/_nuxt/b549c133289d5cc5c4c5.js",
    "revision": "2050eba1e789faefbb5a047b9a85cc6e"
  },
  {
    "url": "/vegetarien/_nuxt/db81b1ecea145a774132.js",
    "revision": "d6a748ad62d99b6f1d334e9cd05b390b"
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
