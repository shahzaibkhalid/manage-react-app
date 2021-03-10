const _serve = require('../compiler/functions/serve')

function serve() {
  /**
   * TODO: run some checks here, like if `dist` exists, only then proceed
   */
  try {
    _serve()
  } catch(e) {
    console.log('Unable to serve')
    console.error(e)
  }
}

module.exports = serve
