const { ESLint } = require('eslint')
const { resolvePath, FOLDER_NAMES, FILE_NAMES } = require('../utils')

async function eslint(options = {fix: false}) {
  try {
    const finalConfig = require(
      resolvePath(
        FOLDER_NAMES.config,
        FOLDER_NAMES.codeQuality,
        FILE_NAMES.eslintConfig
      )
    )
    const eslint = new ESLint({
      /**
       * @useEslintrc
       * We don't want ESLint to look for a configuration file explicitly
       * and rather want it to work on the config object that we pass after
       * merging ourselves
       */
      useEslintrc: false,
      /**
       * @fix
       * If --fix flag is passed, auto-fix is enabled otherwise it's off.
       * By default it's not enabled so the same function can run in CI
       * without producing any side-effects.
       */
      fix: options.fix ? true: false,
      /**
       * @baseConfig
       * Passing the ESLint configuration object
       */
      baseConfig: finalConfig,
    })

    const results = await eslint.lintFiles(`${FOLDER_NAMES.src}/**/*.{js,jsx}`)

    await ESLint.outputFixes(results)

    const formatter = await eslint.loadFormatter('stylish')
    const resultText = formatter.format(results)

    console.log(resultText)

    return results

  } catch(error) {
    process.exitCode = 1;
    console.error(`Error linting the files in '${FOLDER_NAMES.src}' folder`, error)
  }
}

module.exports = eslint
