//TODO: document this
function imageWebpackLoader() {
  return {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }
}

module.exports = imageWebpackLoader

