module.exports = () => {
  const { PROJECT_VARS } = require('../../utils');
  return {
    /**
   * @open
   * To open the development environment URL in Google
   * Chrome (regardless of any other being the default)
   */
    open: {
      app: {
        name: 'Google Chrome',
        arguments: ['--incognito', '--new-window']
      }
    },
    /**
     * @hot
     * To enable Hot Module Replacement, this flag needs to be
     * enabled apart from setting React's Fast Refresh plugins etc.
     */
    hot: true,
    /**
     * @historyApiFallback
     * Prior to SPA routing, a route change was trigerred full-blow through
     * server, `historyApiFallback` tells webpack that we are building a SPA
     * and it should utilize the History API instead of trying to hit the
     * server when we navigate and change routes.
     */
    historyApiFallback: true,
    /**
     * @host
     * Host where development server will run
     */
    host: PROJECT_VARS.HOST,
    /**
     * @port
     * Port where development server will run
     */
    port: PROJECT_VARS.DEV_PORT
  }
}
