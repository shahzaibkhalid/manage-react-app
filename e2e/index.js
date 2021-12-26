const deepmerge = require('deepmerge');
const getBaseCypressConfig = require('./getBaseCypressConfig')
const runBaseCypressPlugins = require('./runBaseCypressPlugins')

function mergeCypressConfigWithBase(projectConfig = {}) {
  /**
   * Cypress does not provide a functionality to `extend`
   * from a base config, and using Object.assign() is
   * unsafe because we want to deep merge all the nested
   * config pieces
   * https://github.com/cypress-io/cypress/issues/5674
   */
  return deepmerge(getBaseCypressConfig(), projectConfig)
}

module.exports = { runBaseCypressPlugins, mergeCypressConfigWithBase };
