const { resolvePath, FOLDER_NAMES } = require('../utils')

const baseJestConfig = {
  // write the base, project agnostic config here
  rootDir: resolvePath(FOLDER_NAMES.src)
}

module.exports = baseJestConfig
