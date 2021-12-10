const { HotModuleReplacementPlugin, EnvironmentPlugin } = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const devServer = require('./devServer')

module.exports = {
  webpack() {
    return {
      mode: 'development',
      /**
       * @devtool
       * Using `eval-cheap-module-source-map` because it is the
       * only one that produces original lines with fast rebuilds
       * though source-maps quality can be improved but rebuild
       * will be slow, so it's a compromise and favoring speed
       * by compromising a bit on readability is sensible.
       * TODO: recheck after development of a few projects
       */
      devtool: 'eval-cheap-module-source-map',
      devServer: devServer(),
      plugins: [
        /**
         * TODO: check if we really need to set this?
         */
        new EnvironmentPlugin(['NODE_ENV']),
        /**
         * both HotModuleReplacementPlugin, and ReactRefreshWebpackPlugin
         * are added to support the new React Refresh implementation
         */
        new HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin()
      ],
      infrastructureLogging: {
        level: 'warn',
      },
      stats: 'errors-warnings'
    }
  }
}
