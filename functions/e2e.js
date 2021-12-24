const cypress = require('cypress');
const { FILE_NAMES, FOLDER_NAMES, resolvePath } = require('../utils')

function e2e(options) {
  const {
    config,
    test,
  } = FOLDER_NAMES;

  const {
    cypressConfig
  } = FILE_NAMES;

  const projectCypressConfig = require(resolvePath(
    config,
    test,
    cypressConfig
  ));

  cypress[options.mode]({
    /**
     * @config
     *
     * It is the standard Cypress configuration object
     */
    config: projectCypressConfig,
    /**
     * @configFile
     *
     * Setting configFile to false as we don't want a `cypress.json`
     * config file at the root rather want to use our custom config
     * file and a config merging strategy.
     */
    configFile: false
  })
}

module.exports = e2e;
