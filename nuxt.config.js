const path = require('path')
module.exports = {
  mode: 'universal',
  env: {
    baseURL: "http://127.0.0.1:3100"
  },
  axios: {
    baseURL: "http://127.0.0.1:3100",
    browserBaseURL: "http://127.0.0.1:3100"
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [{
      src: "/js/xeditor.min.js"
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  types: [
    '@nuxtjs/axios'
  ],
  /*
   ** Global CSS
   */
  css: [
    "~assets/sty/reset.scss",
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios.js',
    '@/plugins/filters.js',
    '@/plugins/ssr-inject.js',
    {
      src: '@/plugins/browser.js',
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/style-resources', '@nuxtjs/axios'],
  // 全局样式变量
  styleResources: {
    scss: "./assets/sty/variable.scss"
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {


      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push()
      }
      config.resolve.alias['components'] = path.resolve(__dirname, 'components')
    }
  }
}
