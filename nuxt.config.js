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
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s | ' + 'Orly John Yanson',
    title: process.env.APP_NAME || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      // facebook
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: process.env.APP_NAME,
      },
      { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: 'iamorly' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Web Developer, UI/UX Designer, Gamer, Artist, Frustrated GameDev 🎮',
      },
      // { hid: 'og:image', property: 'og:image', content: 'https://dimers.appetiserdev.tech/_nuxt/img/dimers-yellow.5ce810c.png' },
      // twitter
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', property: 'twitter:site', content: '@orlyyani' },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content:
          'Web Developer, UI/UX Designer, Gamer, Artist, Frustrated GameDev 🎮',
      },
      { hid: 'twitter:title', property: 'twitter:title', content: 'iamorly' },
      // { hid: 'twitter:image', property: 'twitter:image', content: 'https://dimers.appetiserdev.tech/_nuxt/img/dimers-yellow.5ce810c.png' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap',
      },
    ],
  },
  env: {
    baseUrl: process.env.BASE_URL,
    appName: process.env.APP_NAME,
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '@/plugins/glitchEffect.js' },
    { src: '@/plugins/scrollReveal', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
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
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}
