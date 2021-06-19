const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')
const jsWebpackLoaders = require('./js/loaders')
const htmlWebpackPlugins = require('./html/plugins')
const miscWebpackPlugins = require('./misc/plugins')
const {
  FOLDER_NAMES,
  FILE_NAMES,
  resolvePath,
  getDirectoryAliases
} = require('../../utils');
const fontWebpackLoader = require('./misc/loaders/font-loader')
const imageWebpackLoader = require('./misc/loaders/image-loader')

module.exports = {
  webpack() {
    return {
      /**
       * @entry
       * To configure the entry point for webpack to start
       * building out the dependency graph.
       */
      entry: {
        main: resolvePath(
          FOLDER_NAMES.src,
          FILE_NAMES.indexJSX
        )
      },
      /**
       * @output
       * To configure where and what files webpack emits as
       * a result og a build and how to name those files
       */
      output: {
        /**
         * @filename
         * Name of the main (initial) bundle file emitted
         */
        // TODO: work on the substitutions for caching
        filename: 'js/[name].[contenthash].js',
        assetModuleFilename: 'static/[hash][ext][query]',
        /**
         * @publicPath
         * publicPath is set to `auto` by default. What does this mean?
         * Say you go to a website bundled with webpack and on some custom route
         * e.g www.mywebsite.com/some/custom/nested/route and you bundled the app
         * with `publicPath: 'auto'` or didn't add this property so the default value
         * was `auto`. Now when you go to your website, all the static resource paths
         * will be pre-fixed with `/some/custom/nested/route` so a request to your JS bundle
         * may look like this:
         *
         * www.mywebsite.com/main.729728704.js (with `publicPath: '/'`)
         * www.mywebsite.com/some/custom/nested/route/main.729728704.js (with `publicPath: 'auto'`)
         *
         * We clearly don't want webpack to look out at the routes and change the handling, this may
         * be benificial in multi-page application but not in SPAs. In server.js, we have specific
         * handling for `/js/*.js` (for all JS bundles), `/static/*.js` (for all static resources
         * generated during build-time) and `/*` for everything else which does include any deeply
         * nested route, etc, we download the `index.html` file in such a case and `react-router`
         * takes over.
         */
        publicPath: '/',
      },
      /**
       * @module
       * A standard webpack config option where we configure
       * options regarding various module types (e.g. loaders)
       */
      module: {
        /**
         * @rules
         * Array of `rules` contains configuration objects for
         * all the loaders
         */
        rules: [
          jsWebpackLoaders(),
          fontWebpackLoader(),
          imageWebpackLoader()
        ]
      },
      /**
       * @plugins
       * A plugin is a certain task we want webpack to perform
       * Note: plugins are executed from top to bottom
       */
      plugins: [
        ...miscWebpackPlugins(),
        ...htmlWebpackPlugins()
      ],
      /**
       * @resolve
       * This object has various configuration options regarding
       * resolving modules
       */
      resolve: {
        /**
         * @extensions
         * Add what file extensions webpack should resolve,
         * Note that if two files with the same name but different
         * extension appears, the one with the extension listed
         * first in the array will be resolved
         */
        extensions: [
          '.wasm',
          '.js',
          '.jsx',
          '.mjs',
          '.json',
          '.png',
          '.svg',
          '.jpg',
          '.jpeg',
          '.gif',
          '.woff',
          '.woff2',
          '.eot',
          '.ttf',
          '.otf'
        ],
        /**
         * @alias
         * This property include some of the key project's folders
         * to avoid ugly relative folder structure.
         */
        alias: getDirectoryAliases(),
        /**
         * @plugins
         * An additional list of plugins specifically related to
         * resolving paths
         */
        plugins: [
          /**
           * If there is also an index file, e.g. index.js, and it
           * should be used as entry file instead of the file with
           * the same name of directory, pass true as the first
           * argument when creating new instance.
           */
          new DirectoryNamedWebpackPlugin(true)
        ]
      }
    }
  }
}
