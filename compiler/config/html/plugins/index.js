const htmlWebpackPlugin = require('./html-webpack-plugin')

const htmlWebpackPlugins = () => {
  return [
    htmlWebpackPlugin()
  ]
}

module.exports = htmlWebpackPlugins;
