const { ENV } = require('../utils')

function test(env = ENV.dev) {
  console.log('val 😂: ', env)
  /**
   * env is optional because by-default tests should be executed
   * on the DEV env, but there may be a need to execute tests for
   * other envs (particularly in E2E case), for example if APIs
   * send different data for different envs etc, in that case,
   * an `env` argument can be passed.
   */
  process.env.NODE_ENV = env;
  process.env.__MRA_PROJECT_ENV__ = env;
}

module.exports = test
