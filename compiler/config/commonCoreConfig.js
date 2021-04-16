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
          FILE_NAMES.indexJS
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
        filename: '[name].[contenthash].js',
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
