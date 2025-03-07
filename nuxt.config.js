import {fontsConfig} from "./config/fonts.js";
import {i118Config} from "./config/i118.js";
import {pluginsConfig} from "./config/plugins.js";
import {modulesConfig} from "./config/modules.js";
import {cssConfig} from "./config/css.js";
import {runtimeEnvConfig} from "./config/runtimeEnv.js";

export default defineNuxtConfig({
  compatibilityDate: '2025-02-14',
  head: {
    link: [
      { rel: 'icon', type: 'image/ico', href: '/favicon.ico' }, // Основна іконка
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }, // Для підтримки Png
    ]
  },
  devtools: {enabled: true},
  modules: modulesConfig,
  plugins: pluginsConfig,
  css: cssConfig,
  fonts: fontsConfig,
  i18n: i118Config,
  runtimeConfig: runtimeEnvConfig,
  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  tailwindcss: {
    exposeConfig: true // Додає можливість отримувати налаштування Tailwind в коді
  },
  typescript: {
    strict: false,
    shim: false
  }
})
