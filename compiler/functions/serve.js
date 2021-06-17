const express = require('express')
const {
  resolvePath,
  FOLDER_NAMES,
  FILE_NAMES,
  PROJECT_VARS
} = require('../../utils');
const path = require('path')
const fs = require('fs')

const { PROTOCOL, SERVER_PORT, HOST } = PROJECT_VARS

function serve() {
  const app = express()
  //TODO: document this
  app.use(
    '/static',
    express.static(
      resolvePath(
        FOLDER_NAMES.dist,
        FOLDER_NAMES.static
      )
    )
  )

  //TODO: document this
  app.use(
    '/maps',
    express.static(
      resolvePath(
        FOLDER_NAMES.dist,
        FOLDER_NAMES.maps
      )
    )
  )

  //TODO: document this
  app.get('/js/*.js', (req, res) => {
    const pathToGzBundle = path.join(process.cwd(), FOLDER_NAMES.dist, req.path + '.gz')
    const pathToJSBundle = path.join(process.cwd(), FOLDER_NAMES.dist, req.path)
    fs.promises.access(pathToGzBundle, fs.constants.F_OK)
      .then(() => {
        res.set('Content-Encoding', 'gzip')
        res.sendFile(pathToGzBundle)
      })
      .catch(() => {
        res.sendFile(pathToJSBundle)
      })
  })

  //TODO: document this
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
