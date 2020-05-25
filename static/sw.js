importScripts('/vegetarien/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/vegetarien/_nuxt/06e914532f79fbc0dd7a.js",
    "revision": "f6772f955e9d088036b328530fdba05a"
  },
  {
    "url": "/vegetarien/_nuxt/5162f56a0e258cd604b1.js",
    "revision": "09394c2605ff810eece94c81390cd7fc"
  },
  {
    "url": "/vegetarien/_nuxt/87263f972888c526709f.js",
    "revision": "b07f8f09206d3e317f1505f7973435e6"
  },
  {
    "url": "/vegetarien/_nuxt/984f4ab471ef6ceba1db.js",
    "revision": "a1ac391dbc4d06f709cedb355e86e81c"
  },
  {
    "url": "/vegetarien/_nuxt/9f919c3953fa0d2ea81b.js",
    "revision": "d5df740023b8091e8542eb3398d807a1"
  },
  {
    "url": "/vegetarien/_nuxt/ea462f8ffd4ee8674a3f.js",
    "revision": "c1c09978c50c30ec1ad0e2e36b4846a2"
  },
  {
    "url": "/vegetarien/_nuxt/fd5b1aae6b3d1f7d6daf.js",
    "revision": "f1041262beb15b2d4dbe4a3b9f083134"
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
