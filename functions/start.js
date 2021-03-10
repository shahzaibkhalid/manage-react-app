const util = require('util') // TODO: remove it
const compiler = require('../compiler');
const { ENV, FOLDER_NAMES, PROJECT_CONFIG_FILES, resolvePath } = require('../compiler/utils');

function start(env) {
  process.env.NODE_ENV = ENV.dev;
  try {
    const baseProjectSpecificConfig = require(
      resolvePath(
        FOLDER_NAMES.config,
        FOLDER_NAMES.shaizei,
        PROJECT_CONFIG_FILES.BASE
      )
    );
    const envProjectSpecificConfig = require(
      resolvePath(
        FOLDER_NAMES.config,
        FOLDER_NAMES.shaizei,
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
