const deepmerge = require('deepmerge')
const { resolvePath, FOLDER_NAMES } = require('../utils')

function getBaseJestConfig() {
  // write the base config here
  // TODO: document all the options
  return {
    rootDir: resolvePath(FOLDER_NAMES.src)
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
