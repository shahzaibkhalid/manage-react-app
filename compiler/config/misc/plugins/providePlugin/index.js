const { ProvidePlugin } = require('webpack')
const { resolvePath, FOLDER_NAMES } = require('../../../../utils')

module.exports = function() {
  /**
   * Using ProvidePlugin, we're loading the config file based on
   * the selected environment and assigning it to a project-wide
   * global `__MRA_PROJECT_ENV__`. This could come handy in a
   * variety of different situations
   */
  return new ProvidePlugin({
    __MRA_PROJECT_ENV__: resolvePath(
      FOLDER_NAMES.config,
      FOLDER_NAMES.shaizei,
      process.env.__MRA_PROJECT_ENV__
    )
  })
}
