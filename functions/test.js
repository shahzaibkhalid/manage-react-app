const jest = require('jest')
const { resolvePath, FOLDER_NAMES, FILE_NAMES } = require('../utils')

function test() {
  // get the final config object from the config file in the project
  // pass that config object to jest
  // let argv = process.argv.slice(2);
  const projectJestConfig = resolvePath(
    FOLDER_NAMES.config,
    FOLDER_NAMES.test,
    FILE_NAMES.jestConfig
  )
  jest.run([
    '--config',
    JSON.stringify(projectJestConfig)
  ])
}
module.exports = test
