const babelLoader = require('./babel-loader')

const jsWebpackLoaders = () => {
  return {
    /**
     * @test
     * A RegExp to indicate which file and/or combinations
     * of files we want to run the loaders identified in
     * the `use` array.
     */
    test: /\.(js|jsx)$/i,
    /**
     * @exclude
     * When we apply a set of loaders on the files identified
     * using `test` RegExp, we want to exclude all the matching
     * files in the `node_modules` directory as those files
     * are already compiled.
     */
    exclude: /node_modules/,
    /**
     * @use
     * An array to chain all the loaders we want to apply to
     * the files identified using the `test` RegExp
     * Note: Loaders are executed from bottom to top
     */
    use: [
      babelLoader()
    ]
  }
}

module.exports = jsWebpackLoaders;
