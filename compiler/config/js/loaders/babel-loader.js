const { isDevelopment } = require('../../../utils')

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
    options: {
      /**
       * @plugins
       * A plugin is a single functionality, it takes one form
       * of JavaScript and returns another form of JavaScript.
       * For example, converting ES-modern to ES5
       */
      plugins: [
        /**
         * We're using "react-refresh" package by React's team
         * at Facebook to enable Hot Module Replacement.
         * Note: react-refresh also puts an error overlay to show
         * the errors on the screen (in the browser)
         * TODO: if development specific config grows in size, move it away from here
         */
        isDevelopment() ? require.resolve('react-refresh/babel') : {}
      ],
      /**
       * @presets
       * A preset is an array of Babel plugins to glue the
       * related functionality together.
       * Note: Presets are executed from bottom to top
       */
      presets: [
        [
          require.resolve('@babel/preset-react'),
          {
            /**
             * runtime: automatic is choosen to apply the latest JSX Transform
             * after this, we don't have to import React in every JSX file
             * source: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
             * TODO: check if this config options still needs to be here after babel v8
             */
            'runtime': 'automatic'
          }
        ],
        require.resolve('@babel/preset-env'),
      ],
    }
  }
}

module.exports = babelLoader;
