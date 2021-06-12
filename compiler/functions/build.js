const webpack = require('webpack');
const fs = require('fs');
const { resolvePath, FOLDER_NAMES, FILE_NAMES } = require('../../utils');

function build(config) {
  // develop the logic of bundling the code
  const compiler = webpack(config);
  compiler.run(
    (err, stats) => {
      // fatal webpack error (wrong config etc)
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details)
        }
        return;
      }

      const info = stats.toJson()

      // compilation errors (missing modules, syntax errors etc)
      // if (stats.hasErrors()) {
      //   console.error('does it come here???')
      //   console.error(info.errors)
      // }

      // compilation warnings
      // if (stats.hasWarnings()) {
      //   console.warn(info.warnings)
      // }

      /**
       * TODO: revisit this in the future if more verbose
       * TODO: output is needed, though analyzer is good to handle this
       */
      console.log(
        stats.toString('minimal')
      )
    }
  )
}

module.exports = build;
