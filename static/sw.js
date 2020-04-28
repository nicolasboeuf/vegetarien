importScripts('/vegetarien/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/vegetarien/_nuxt/118c323b4d3207fe2a9a.js",
    "revision": "d09fae047b4f9875565b2fbe4fa93a57"
  },
  {
    "url": "/vegetarien/_nuxt/1470668137c378e37c55.js",
    "revision": "33e4771a3583d5b9191e2bb57de36950"
  },
  {
    "url": "/vegetarien/_nuxt/4111fe3280f7fe04eda5.js",
    "revision": "a12120ccca05aab31f7b18fbdf275a8b"
  },
  {
    "url": "/vegetarien/_nuxt/54097b9447ad68779454.js",
    "revision": "a76945f59e6555c3c7cfae3b21a2c3a3"
  },
  {
    "url": "/vegetarien/_nuxt/5576370335586627e837.js",
    "revision": "d09ad4ae2ac16b1ecb3d71bb2a099524"
  },
  {
    "url": "/vegetarien/_nuxt/aa2383d850e4de24d7c8.js",
    "revision": "f3ca80d5d7a01edc6cbce2fab1dc1381"
  },
  {
    "url": "/vegetarien/_nuxt/bc787701658b7b550d81.js",
    "revision": "c0a11b426058c346af53607bb444d6e5"
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
