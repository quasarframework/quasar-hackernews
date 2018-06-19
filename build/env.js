const
  theme = process.argv[2] || process.env.QUASAR_THEME || 'mat',
  port = process.env.PORT || 9000

module.exports = {
  theme,
  quasarVersion: require('../node_modules/quasar-framework/package.json').version,
  port,
  rtl: process.env.QUASAR_RTL !== void 0
}
