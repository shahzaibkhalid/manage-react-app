const cypress = require('cypress');
const { FILE_NAMES, FOLDER_NAMES, resolvePath } = require('../utils')

function e2e() {
  const {
    config,
    test
  } = FOLDER_NAMES;

  const {
    cypressConfig
  } = FILE_NAMES;

  const projectCypressConfig = require(resolvePath(
    config,
    test,
    cypressConfig
  ));

  cypress.run({
    //todo: explain various config options here
    config: projectCypressConfig,
    configFile: false
  })
}

module.exports = e2e;
