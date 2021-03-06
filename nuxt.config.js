import colors from 'vuetify/es5/util/colors'

import pkg from './package'

require('dotenv').config()


const choosePort = (ENVPROD) => {
  const NUXT_ENV_PORT_DEV = parseInt(process.env.NUXT_ENV_PORT_DEV) || 50050
  const NUXT_ENV_PORT_PREPROD = parseInt(process.env.NUXT_ENV_PORT_PREPROD) || 50051
  const NUXT_ENV_PORT_PROD = parseInt(process.env.NUXT_ENV_PORT_PROD) || 50052
  if (ENVPROD === 'dev') {
    return NUXT_ENV_PORT_DEV
  } else if (ENVPROD === 'preprod') {
    return NUXT_ENV_PORT_PREPROD
  } else if (ENVPROD === 'prod') {
    return NUXT_ENV_PORT_PROD
  }
}

const buildLocales = () => {
  let locales = [] 
  for ( const locale of process.env.NUXT_ENV_LOCALES.split(',') ) {
    let localeData = locale.split(':')
    let localeObj = {
      name: localeData[0],
      code: localeData[1],
      iso: localeData[2],
      file: localeData[2] + '.json'
    }
    locales.push(localeObj)
  }
  return locales
}

const configApp = {

  /// APP INFOS
  appTitle: process.env.NUXT_ENV_APP_TITLE,

  // DEV MODE - PORT - HOST ...
  mode: process.env.NUXT_ENV_RUN_MODE,
  host: process.env.NUXT_ENV_HOST,
  port: choosePort(process.env.NUXT_ENV_RUN_MODE),

  // INTERNATIONALIZATION
  defaultLocale: process.env.NUXT_ENV_LOCALE_DEFAULT,
  localesBuild: buildLocales(),
  // locales: buildLocales().map(loc => {return loc.code}) ,

  // UI
  UI_config : {
    colors : {
      primary: process.env.VUETIFY_primary,
      accent: process.env.VUETIFY_accent,
      secondary: process.env.VUETIFY_secondary,
      info: process.env.VUETIFY_info,
      warning: process.env.VUETIFY_warning,
      error: process.env.VUETIFY_error,
      success: process.env.VUETIFY_success
    },
    typos : {

    }
  }

}

// NUXT CONFIG
export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: "",
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: "Générateur de listes de courses végétariennes"},
      { 'http-equiv': 'Content-Type', content: 'text/html', charset: 'utf-8' },
      { name: 'viewport', content:'=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
      { name: 'author', content: 'Nicolas Boeuf' },
      { name: 'robots', content: 'follow, index' },
      {
        property: 'og:type', 
        content: 'website'
      },
      {
        property: 'og:url',
        content: 'http://nicolasboeuf.fr/vegetarien'
      },
      {
        property: 'og:title',
        content: 'Générateur de listes de courses végétariennes'
      },
      {
        property: 'og:image',
        content: 'http://nicolasboeuf.fr/vegetarien/share.png'
      },
      {
        property: 'og:description',
        content: 'Générez votre liste de courses pour des recettes végétariennes et végétaliennes'
      },
      {
        property: 'og:app_id',
        content: ''
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        property: 'twitter:image',
        content: 'http://nicolasboeuf.fr/vegetarien/share.png'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ],
    script: [
     //{ defer:true, src: 'https://www.googletagmanager.com/gtag/js?id=UA-51867236-7' }
   ]
  },

  // for build or dev
  // https://nuxtjs.org/faq/host-port/
  server: {
    port: configApp.port, // 50050
    host: configApp.host // XXX.XX.XX.XX
  },

  // custom env variables for nuxt
  // cf : https://github.com/nuxt/nuxt.js/issues/1789
  env: {
    MODE_APP: configApp.mode,
    CONFIG_APP: configApp
  },

  /*
  ** Routes and middlewares to load before loading routes
  */
  router : {
    middleware: [
      'setLocales',
      'i18n',
    ],
    //base:"/vegetarien/"
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { 
    color: '#fff' 
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl',
    '~/assets/css/main.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/i18n.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [

    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',

  ],

  devModules: [
    '@nuxtjs/vuetify'
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    theme: {
        primary: configApp.UI_config.colors.primary,
        secondary: configApp.UI_config.colors.secondary,
        accent: configApp.UI_config.colors.accent,
        error: configApp.UI_config.colors.error,
        warning: configApp.UI_config.colors.warning,
        info: configApp.UI_config.colors.info,
        success: configApp.UI_config.colors.success
    }
  },
  generate: {
    routes: [
      '/',
      '/en/',
      '/fr/',
    ]
  },
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // vendor: ['vue-i18n'],
    extend(config, ctx) {
    }
  }
}
