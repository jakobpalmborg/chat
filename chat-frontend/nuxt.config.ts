// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      strapiURL: process.env.STRAPI_URL,
      strapiWS: process.env.STRAPI_WS
    }
  },
  routeRules: {
    '/chat': {ssr: false}
  },
  modules: [
    "@nuxtjs/google-fonts"
  ],
  
  googleFonts: {
    families: {
      Montserrat: true
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: { 
    head: {
     script: [{src: '~/plugins/hotjar.js'}]   
    }
  },  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
