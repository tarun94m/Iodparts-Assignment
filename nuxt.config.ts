export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  app: {
    head: {
      title: 'Nuxt SSR App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'A Nuxt.js SSR application with authentication and listing features' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://api.example.com'
    }
  }
})