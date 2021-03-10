const express = require('express')
const {
  resolvePath,
  FOLDER_NAMES,
  FILE_NAMES,
  PROJECT_VARS
} = require('../utils');

const { PROTOCOL, SERVER_PORT, HOST } = PROJECT_VARS

function serve() {
  const app = express()

  app.use(
    express.static(
      resolvePath(
        FOLDER_NAMES.dist
      )
    )
  )

  app.get('/*', (_, res) => {
    res.sendFile(
      resolvePath(
        FOLDER_NAMES.dist,
        FILE_NAMES.indexHTML
      )
    )
  })

  app.listen(
    SERVER_PORT,
    HOST,
    () => console.log(`
      Serving bundled code on port ${SERVER_PORT}! 🎉
      ${PROTOCOL}${HOST}:${SERVER_PORT}
    `)
  )
}

module.exports = serve
