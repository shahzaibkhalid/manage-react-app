const util = require('util') // TODO: remove it
const compiler = require('../compiler');
const { ENV, FOLDER_NAMES, PROJECT_CONFIG_FILES, resolvePath } = require('../compiler/utils');

function start(env) {
  process.env.NODE_ENV = ENV.dev;
  process.env.__MRA_PROJECT_ENV__ = env;
  try {
    const baseProjectSpecificConfig = require(
      resolvePath(
        FOLDER_NAMES.config,
        FOLDER_NAMES.envs,
        PROJECT_CONFIG_FILES.BASE
      )
    );
    const envProjectSpecificConfig = require(
      resolvePath(
        FOLDER_NAMES.config,
        FOLDER_NAMES.envs,
        env
      )
    );
    const finalCompilerConfig = compiler.merge(
      baseProjectSpecificConfig.webpack(),
      envProjectSpecificConfig.webpack()
    );
    // console.log(util.inspect(finalCompilerConfig, {showHidden: false, depth: null}))
    compiler.run(finalCompilerConfig);
  } catch(e) {
    console.log('error while running the dev server ', e);
  }
}

module.exports = start;
