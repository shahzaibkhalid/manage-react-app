const webpackbar = require('./webpackbar');
const providePlugin = require('./providePlugin')

const miscWebpackPlugins = () => {
  return [
    providePlugin(),
    webpackbar()
  ]
}

module.exports = miscWebpackPlugins;
