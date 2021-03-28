const { EnvironmentPlugin, SourceMapDevToolPlugin } = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  webpack() {
    const { PROJECT_VARS, FILE_NAMES, FOLDER_NAMES, resolvePath } = require('../../utils')
    const { PROTOCOL, SERVER_PORT, HOST } = PROJECT_VARS

    return {
      mode: 'production',
      /**
       * @output
       * To configure where and what files webpack emits as
       * a result og a build and how to name those files
       */
      output: {
        /**
         * @clean
         * To clean the output directory (dist) before emiting
         * the files
         */
        clean: true
      },
      plugins: [
        /**
         * TODO: check if we really need to set this?
         */
        new EnvironmentPlugin(['NODE_ENV']),
        /**
         *  We're essentially protecting the source-code of
         *  production build by not allowing source-maps to
         *  be downloaded on a deployed web-page.
         *  Note: Source-maps will only work on the dev-env
         *  Note: We can override this setting for `staging`
         *  and `qa` environments by setting `devtool` property
         *  which will override this setting.
         */
        new SourceMapDevToolPlugin({
          publicPath: `${PROTOCOL}${HOST}:${SERVER_PORT}/`,
          filename: `${FOLDER_NAMES.maps}/[name].js.map`
        }),
        new BundleAnalyzerPlugin({
          /**
           * @analyzerMode
           *
           * generate an HTML file instead of starting a server
           * because we want a manual control of when we want to
           * run the server (using our own script)
           */
          analyzerMode: 'static',
          /**
           * @reportFilename
           *
           * We wanto save the report in a sub-directory within
           * the `dist` folder.
           */
          reportFilename: resolvePath(
            FOLDER_NAMES.dist,
            FOLDER_NAMES.report,
            FILE_NAMES.reportHTML
          ),
          /**
           * @generateStatsFile
           *
           * We want stats.json file for tracking and/or further
           * analysis of the build
           */
          generateStatsFile: true,
          /**
           * @statsFilename
           */
          statsFilename: resolvePath(
            FOLDER_NAMES.dist,
            FOLDER_NAMES.report,
            FILE_NAMES.statsJSON
          ),
          /**
           * @openAnalyzer
           *
           * Don't want to open analyzer after build is done
           */
          openAnalyzer: false
        })
      ]
    }
  }
}
