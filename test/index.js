const deepmerge = require('deepmerge')
const { resolvePath, FOLDER_NAMES } = require('../utils')

function getBaseJestConfig() {
  // TODO: document all the options
  return {
    /**
     * @rootDir
     * To point-out the source-code directory that Jest
     * should be using and looking out for tests
     */
    rootDir: resolvePath(FOLDER_NAMES.src),
    transform: {
      //TODO: document the following
      // why this has to be a separate file?
      // why the path should be absolute?
      '^.+\\.(js|jsx)$': '<rootDir>/../node_modules/manage-react-app/test/babelTransformForJest.js',
    },
    //TODO: add webpack alias here
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
