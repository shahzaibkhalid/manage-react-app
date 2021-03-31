const util = require('util') // TODO: remove it
const compiler = require('../compiler');
const { ENV, getFinalWebpackConfig } = require('../utils');

function build(env) {
  process.env.NODE_ENV = ENV.prod
  process.env.__MRA_PROJECT_ENV__ = env
  try {
    compiler.build(
      getFinalWebpackConfig(env)
    )
    // console.log(util.inspect(finalCompilerConfig, {showHidden: false, depth: null}))
  } catch(e) {
    console.log('error ', e)
  }
}

module.exports = build;
