const compiler = require('../compiler');
const { ENV, getFinalWebpackConfig } = require('../utils');

function build(env = ENV.prod) {
  process.env.NODE_ENV = ENV.prod
  process.env.__MRA_PROJECT_ENV__ = env
  try {
    compiler.build(
      getFinalWebpackConfig(env)
    )
  } catch(e) {
    console.log('error ', e)
  }
}

module.exports = build;
