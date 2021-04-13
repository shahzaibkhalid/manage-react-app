const { getFinalBabelConfig } = require('../../../../utils')

function babelLoader() {
  return {
    /**
     * @loader
     * Standard `loader` property highlighting which
     * loader needs to be used
     * We used `require.resolve` to resolve the path
     * to the actual folder where `babel-loader` is
     */
    loader: require.resolve('babel-loader'),
    /**
     * @options
     * Every loader object has an `options` property to
     * configure the said loader.
     * Note: The options vary from loader to loader.
     */
    options: getFinalBabelConfig()
  }
}

module.exports = babelLoader;
