const util = require('util') // TODO: remove it
const compiler = require('../compiler');
const { ENV, getFinalWebpackConfig } = require('../utils');

function start(env = ENV.dev) {
  process.env.NODE_ENV = ENV.dev;
  process.env.__MRA_PROJECT_ENV__ = env;
  try {
    // console.log(util.inspect(getFinalWebpackConfig(env), {showHidden: false, depth: null}))
    compiler.run(
      getFinalWebpackConfig(env)
    );
  } catch(e) {
    console.log('error while running the dev server ', e);
  }
}

module.exports = start;
