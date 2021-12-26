const { resolvePath, PROJECT_VARS, FOLDER_NAMES, FILE_NAMES } = require('../utils');

function getBaseCypressConfig() {
  const { PROTOCOL, HOST, DEV_PORT } = PROJECT_VARS;
  const { src, __tests__, testUtils, cypress, plugins, support, screenshots, videos } = FOLDER_NAMES;
  const { indexJS } = FILE_NAMES;

  // https://github.com/cypress-io/cypress/issues/1372
  //todo: explain these properties
  const baseCypressConfig = {
    baseUrl: `${PROTOCOL}${HOST}:${DEV_PORT}`,
    fileServerFolder: resolvePath(src, testUtils, cypress),
    integrationFolder: resolvePath(src, __tests__),
    fixturesFolder: resolvePath(src, testUtils, cypress),
    pluginsFile: resolvePath(src, testUtils, cypress, plugins, indexJS),
    supportFile: resolvePath(src, testUtils, cypress, support, indexJS),
    screenshotsFolder: resolvePath(src, testUtils, cypress, screenshots),
    videosFolder: resolvePath(src, testUtils, cypress, videos),
  };

  return baseCypressConfig;
}


module.exports = getBaseCypressConfig;
