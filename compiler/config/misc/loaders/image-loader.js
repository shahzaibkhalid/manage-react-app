/**
 * @imageWebpackLoader
 * This function returns the loader config for a
 * variety of common image file extensions that can
 * be resolved by webpack. Starting v5, we need the
 * built-in `asset/resource` to handle these files
 */
function imageWebpackLoader() {
  return {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }
}

module.exports = imageWebpackLoader

