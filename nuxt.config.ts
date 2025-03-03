// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt'],
  i18n: {
    locales: [
      { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/us.png', iso: 'en-US' },
      { code: 'id', name: 'Bahasa Indonesia', flag: 'https://flagcdn.com/w40/id.png', iso: 'id-ID' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
  }
})
