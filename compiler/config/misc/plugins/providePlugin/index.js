const { ProvidePlugin } = require('webpack')
const { resolvePath, FOLDER_NAMES, ENV } = require('../../../../../utils')

module.exports = function() {
  /**
   * Using ProvidePlugin, we're loading the config file based on
   * the selected environment and assigning it to a project-wide
   * global `__MRA_PROJECT_ENV__`. This could come handy in a
   * variety of different situations
   *
   * Why do we pass ENV.dev config if no config is setup programmatically?
   * Because it's a safe fallback, as DEV config works in almost all the cases.
   */
  return new ProvidePlugin({
    __MRA_PROJECT_ENV__: resolvePath(
      FOLDER_NAMES.config,
      FOLDER_NAMES.envs,
      process.env.__MRA_PROJECT_ENV__ || ENV.dev
    )
  })
}
