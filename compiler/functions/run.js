const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

function run(config) {
  const compiler = Webpack(config);
  const server = new WebpackDevServer(config.devServer, compiler);

  async function runServer() {
    await server.start();
  }
  runServer();
}

module.exports = run;
