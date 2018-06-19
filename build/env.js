const
  theme = process.env.QUASAR_THEME || 'mat',
  port = process.env.PORT || 9554

module.exports = {
  theme,
  quasarVersion: require('../node_modules/quasar-framework/package.json').version,
  port
}
