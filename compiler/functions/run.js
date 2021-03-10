const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { PROJECT_VARS } = require('../utils');

function run(config) {
  const compiler = Webpack(config);
  const server = new WebpackDevServer(compiler, config.devServer);

  const { PROTOCOL, HOST, DEV_PORT } = PROJECT_VARS;

  server.listen(
    DEV_PORT,
    HOST,
    () => console.log(`
      Serving source code on port ${DEV_PORT}! 🎉
      ${PROTOCOL}${HOST}:${DEV_PORT}
    `)
  )
}

module.exports = run;
