const deepmerge = require('deepmerge')
const { resolvePath, FOLDER_NAMES, getDirectoryAliases } = require('../utils')

function getBaseJestConfig() {
  // TODO: document all the options

  /**
   * @webpackAliasForJest
   * `getDirectoryAliases` gives us the object with all the directory
   * aliases we have in our app, from these objects, we are constructing
   * the aliases in a way that Jest can understand when it parses absolute
   * path aliases in the source code.
   */

  const webpackAliasForJest = {}
  const aliasFoldersNameList = Object.keys(getDirectoryAliases())
  for (let folder of aliasFoldersNameList) {
    webpackAliasForJest[`^${folder}(.*)$`] = `<rootDir>/${folder}$1`
  }

  return {
    /**
     * @rootDir
     * To point-out the source-code directory that Jest
     * should be using and looking out for tests
     */
    rootDir: resolvePath(FOLDER_NAMES.src),
    /**
     * @transform
     *
     * Why?
     * Our code uses a ton of APIs and syntactic sugars like JSX that are
     * not natively understood, and we use babel for transpilation.
     * But, Jest has no idea about it and once it stumbles on some non-standard
     * code like JSX, it can't parse it.
     *
     * This configuration is a way to transform the test code before Jest actually
     * run the code.
     *
     * Note: transform object's property should be the RegEx, narrowing done the
     * potential files for transformation and the value is the path to the file
     * that handles the transformation.
     * Note: Check the `babelTransformForJest.js` for more information on the
     * transformation.
     */
    transform: {
      '^.+\\.(js|jsx)$': '<rootDir>/../node_modules/manage-react-app/test/babelTransformForJest.js',
    },
    /**
     * @moduleNameMapper
     * This property lists how Jest should handle modules in the test code.
     *
     * -> For CSS/LESS, we are defining styleMock as we don't need the
     * actual styles in the test.
     * -> For a variety of static assets, we are defining fileMock in order to
     * mock those static assets as we don't need a whole MP4 file to run the
     * tests.
     * -> For JS/JSX files, we are adding the aliases for absolute paths and
     * how those should files should be resolved.
     */
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/../node_modules/manage-react-app/test/mocks/fileMock.js',
      '\\.(css|less)$': '<rootDir>/../node_modules/manage-react-app/test/mocks/styleMock.js',
      ...webpackAliasForJest,
    },
    /**
     * @resolver
     *
     * To implement the custom module resolving behavior for Jest.
     * Note: the `resolver` option has to point to another file so we
     * ended up creating `resolver.js` (check the said file for more
     * detailed comment on why we need a custom resolver)
     */
    resolver: '<rootDir>/../node_modules/manage-react-app/test/resolver.js',
    /**
     * @reporters
     *
     * Reporters are JS classes that implements certain methods like onRunStart
     * and onRunComplete etc. and such functions are invoked by Jest process
     * during the time of test execution.
     *
     * Why are we writing a custom reporter?
     * Plase check the `reporter.js` file for the actual intent.
     *
     * default: means we want to have the default reporter in place while we add out
     * own too.
     *
     */
    reporters: ['default', '<rootDir>/../node_modules/manage-react-app/test/reporter.js']
  }
}

function mergeJestConfigWithBase(projectConfig = {}) {
  /**
   * Jest does not provide a functionality to `extend`
   * from a base config, and using Object.assign() is
   * unsafe because we want to deep merge all the nested
   * config pieces
   * https://github.com/facebook/jest/issues/3564
   */
  return deepmerge(getBaseJestConfig(), projectConfig)
}

module.exports = { getBaseJestConfig, mergeJestConfigWithBase }
