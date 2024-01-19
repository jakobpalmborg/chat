// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
