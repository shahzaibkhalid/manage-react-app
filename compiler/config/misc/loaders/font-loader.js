//TODO: document this
function fontWebpackLoader() {
  return {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  }
}

module.exports = fontWebpackLoader
