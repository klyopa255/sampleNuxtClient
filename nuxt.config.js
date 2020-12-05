export default {
  publicRuntimeConfig: {
    /** @type {import('io/types').NuxtSocketIoRuntimeOptions} */
    io: {
      sockets: [
        {
          name: 'publicSocket',
          url: 'url1',
        },
      ],
    },
  },
  privateRuntimeConfig: {
    /** @type {import('io/types').NuxtSocketIoRuntimeOptions} */
    io: {
      sockets: [
        {
          name: 'privateSocket',
          url: 'url2',
        },
      ],
    },
  },
  loading: false,
  env: {
    storageBaseUrl: process.env.STORAGE_BASE_URL,
    storageServerBaseUrl: process.env.STORAGE_SERVER_BASE_URL,
    googleMapApiKey: process.env.GOOGLE_MAP_API_KEY,
  },
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Staj',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  server: {
    port: process.env.PORT, // default: 3000
    host: process.env.HOST, // default: localhost
  },
  /*
   ** Global CSS
   */
  css: [{ src: '@/assets/scss/style', lang: 'scss' }],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/logout',
    '~/plugins/axios',
    '~/plugins/addToObj',
    '~/plugins/vue-awesome-swiper',
    '~/plugins/vuelidate',
    '~/plugins/commonMethods',
    '~/plugins/moment',
    '~/plugins/share',
    '~/plugins/authentication',
    { src: '~/plugins/TiptapVuetify.js', mode: 'client' },
    { src: '~/plugins/vue-tags.js', mode: 'client' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    // '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
    'cookie-universal-nuxt',
    '@nuxtjs/vuetify',
    '@nuxtjs/google-gtag',
    'vue-scrollto/nuxt',
    '@/io/module.js',
    [
      'nuxt-google-maps-module',
      {
        key: process.env.GOOGLE_MAP_API_KEY + '&language=en',
      },
    ],
  ],
  'google-gtag': {
    id: process.env.GOOGLE_ANALYTICS_TOKEN,
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.API_BASE_URL + '/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url: process.env.API_BASE_URL + '/logout',
            method: 'post',
          },
          user: {
            url: process.env.API_BASE_URL + '/user',
            method: 'get',
            propertyName: 'user',
          },
        },
      },
    },
    rewriteRedirects: false,
    redirect: {
      login: '/login',
      callback: '/login',
      logout: '/',
      home: '/profile',
    },
  },
  router: {
    middleware: 'auth',
  },
  svgSprite: {
    input: '~/assets/svg/',
  },
  /** @type {import('io/types').NuxtSocketIoOptions} */
  io: {
    sockets: [
      {
        name: 'home',
        url: process.env.CLIENT_BASE_URL,
        vuex: {
          mutations: [{ progress: 'examples/SET_PROGRESS' }],
          actions: [{ chatMessage: 'FORMAT_MESSAGE' }],
          emitBacks: [
            'examples/someObj',
            'examples/sample',
            { 'examples/sample2': 'sample2' },
            'titleFromUser',
          ],
        },
        namespaces: {
          '/index': {
            emitters: ['getMessage2 + testMsg --> message2Rxd'],
            listeners: ['chatMessage2', 'chatMessage3 --> message3Rxd'],
          },
          '/examples': {
            emitBacks: ['sample3', 'sample4 <-- myObj.sample4'],
            emitters: [
              'reset] getProgress + refreshInfo --> progress [handleDone',
            ],
            listeners: ['progress'],
          },
        },
      },
      {
        name: 'chatSvc',
        url: process.env.CLIENT_BASE_URL,
        // vuex: {
        //   mutations: [{ progress: 'examples/SET_PROGRESS' }],
        //   actions: [{ chatMessage: 'FORMAT_MESSAGE' }],
        //   emitBacks: [
        //     'examples/someObj',
        //     'examples/sample',
        //     { 'examples/sample2': 'sample2' },
        //     'titleFromUser'
        //   ]
        // },
        // namespaces: {
        //   '/index': {
        //     emitters: ['getMessage2 + testMsg --> message2Rxd'],
        //     listeners: ['chatMessage2', 'chatMessage3 --> message3Rxd']
        //   },
        //   '/examples': {
        //     emitBacks: ['sample3', 'sample4 <-- myObj.sample4'],
        //     emitters: [
        //       'reset] getProgress + refreshInfo --> progress [handleDone'
        //     ],
        //     listeners: ['progress']
        //   }
        // }
      },
      { name: 'goodSocket', url: process.env.CLIENT_BASE_URL },
      { name: 'badSocket', url: process.env.CLIENT_BASE_URL },
      { name: 'work', url: 'http://somedomain1:3000' },
      { name: 'car', url: 'http://somedomain2:3000' },
      { name: 'tv', url: 'http://somedomain3:3000' },
      {
        name: 'test',
        url: 'http://localhost:4000',
        vuex: {
          mutations: [{ progress: 'examples/SET_PROGRESS' }],
          actions: [{ chatMessage: 'FORMAT_MESSAGE' }],
          emitBacks: ['examples/sample', { 'examples/sample2': 'sample2' }],
        },
      },
    ],
  },
  /*
   ** SCSS global
   */
  styleResources: {
    scss: ['@/assets/scss/variables.scss', '@/assets/scss/mixins.scss'],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_BASE_URL,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ['vuetify/lib', 'tiptap-vuetify', 'vuelidate', 'vue-share-it'],
  },
}
