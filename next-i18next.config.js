/** @type {import('next-i18next').UserConfig} */

module.exports = {
  i18n: {
    defaultLocale: 'fa',
    locales: ['fa'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
