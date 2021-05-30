/**
 * Writing a custom reporter to catch certain events like:
 * - when all test suites ran but some failed
 * - when all test ssuites ran and all passed
 *
 * The intent here is to print certain error messages
 * for different Jest outputs
 */

class Reporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
  }

  onRunComplete(_, options) {
    if (options && options.numFailedTestSuites > 0) {
      console.error('\nSome test suites failed! ❌')
    } else {
      console.log('\nAll test suites passed! ✅')
    }
  }
}

module.exports = Reporter
