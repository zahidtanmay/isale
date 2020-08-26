import colors from 'vuetify/es5/util/colors'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@mdi/font/css/materialdesignicons.css',
    '~assets/custom/colors.scss'
  ],

  styleResources: {
    scss: ['./assets/custom/*.scss']
  },

  plugins: [
    { src: '~/plugins/vue-lodash', ssr: false},
    { src: '~/plugins/zoomer', ssr: false },
    { src: '~/plugins/route', ssr: false },
    { src: '~/plugins/axios', ssr: true },
    { src: '~/plugins/vuex-persist', ssr: false },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/toast',
    '@nuxtjs/auth',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL,
    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*',
        'X-Company-Id': '1',
      },
      delete: {},
      get: {},
      head: {},
      post: {},
      put: {},
      patch: {}
    }
  },
  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {},
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },

  loading: {
    color: '#108775',
    height: '3px',
    failedColor: 'red',
    throttle: 200,
  },

  router: {
    base: '/i-sale/',
    middleware: ['auth'],
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
  },



  auth: {
    token: {
      prefix: 'shop_token'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/verify-otp', method: 'post', propertyName: 'data.token' },
          logout: { url: 'logout', method: 'get'},
          user: { url: 'customer', method: 'get', propertyName: 'data'}
        },
        tokenType: 'Bearer'
      }
    }
  },

  toast: {
    position: 'top-right',
    duration: 4000,
  }
}
