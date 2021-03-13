const HTMLWebpackPlugin = require('html-webpack-plugin')
// TODO: add module alias later on
const {
  FOLDER_NAMES,
  FILE_NAMES,
  resolvePath
} = require('../../../../utils')

module.exports = function() {
  return new HTMLWebpackPlugin({
    /**
     * @template
     * This option takes an existing HTML file
     * (in our case, the one in the project) and
     * injects scripts
     */
    template: resolvePath(
      FOLDER_NAMES.src,
      FILE_NAMES.indexHTML
    )
  });
}
