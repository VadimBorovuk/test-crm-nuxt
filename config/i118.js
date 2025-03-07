export const i118Config = {
  lazy: true,
  defaultLocale: 'en',
  locales: [
    {code: 'en', name: 'en'},
    {code: 'uk', name: 'uk'},
    {code: 'pt', name: 'pt'},
    {code: 'es', name: 'es'},
    {code: 'ru', name: 'ru'},
  ],
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'cc_locale',
    alwaysRedirect: true
  },
  strategy: 'no_prefix', // Прибирає код мови з URL
}
