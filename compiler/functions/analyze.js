const express = require('express')
const {
  resolvePath,
  FOLDER_NAMES,
  FILE_NAMES,
  PROJECT_VARS
} = require('../../utils');

const { PROTOCOL, ANALYZER_SERVER_PORT, HOST } = PROJECT_VARS

function analyze() {
  const app = express()

  app.use(
    express.static(
      resolvePath(
        FOLDER_NAMES.dist,
        FOLDER_NAMES.report
      )
    )
  )

  app.get('/*', (_, res) => {
    res.sendFile(
      resolvePath(
        FOLDER_NAMES.dist,
        FOLDER_NAMES.report,
        FILE_NAMES.reportHTML
      )
    )
  })

  app.listen(
    ANALYZER_SERVER_PORT,
    HOST,
    () => console.log(`
      Running analyzer on bundled code at port ${ANALYZER_SERVER_PORT}! 🧐
      ${PROTOCOL}${HOST}:${ANALYZER_SERVER_PORT}
    `)
  )
}

module.exports = analyze
