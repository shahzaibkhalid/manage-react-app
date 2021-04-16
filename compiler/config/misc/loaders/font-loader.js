/**
 * @fontWebpackLoader
 * This function returns the loader config for a
 * variety of common font file extensions that can
 * be resolved by webpack. Starting v5, we need the
 * built-in `asset/resource` to handle these files
 */
function fontWebpackLoader() {
  return {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  }
}

module.exports = fontWebpackLoader
