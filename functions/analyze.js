const _analyze = require('../compiler/functions/analyze')

function analyze() {
  /**
   * TODO: run some checks here, like if `dist/report` exists only then proceed
   */
  try {
    _analyze()
  } catch(error) {
    console.error(error)
  }
}

module.exports = analyze

