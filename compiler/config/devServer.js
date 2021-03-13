module.exports = {
  /**
   * @open
   * To open the development environment URL in Google
   * Chrome (regardless of any other being the default)
   */
  open: {
    app: ['Google Chrome', '--incognito']
  },
  /**
   * @hot
   * To enable Hot Module Replacement, this flag needs to be
   * enabled apart from setting React's Fast Refresh plugins etc.
   */
  hot: true,
  /**
   * Tells dev-server to suppress messages like the webpack bundle
   * information. Errors and warnings will still be shown.
   * We are logging most stuff through custom `run` script
   * TODO: see if we need to use quiet instead of noInfo
   */
  noInfo: true,
}
