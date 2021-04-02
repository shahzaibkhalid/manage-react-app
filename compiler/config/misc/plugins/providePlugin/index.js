const { ProvidePlugin } = require('webpack')
const { resolvePath, FOLDER_NAMES, ENV } = require('../../../../../utils')

module.exports = function() {
  /**
   * Using ProvidePlugin, we're loading the config file based on
   * the selected environment and assigning it to a project-wide
   * global `__MRA_PROJECT_ENV__`. This could come handy in a
   * variety of different situations
   * TODO: document why ENV.dev is being passed?
   */
  return new ProvidePlugin({
    __MRA_PROJECT_ENV__: resolvePath(
      FOLDER_NAMES.config,
      FOLDER_NAMES.envs,
      process.env.__MRA_PROJECT_ENV__ || ENV.dev
    )
  })
}
