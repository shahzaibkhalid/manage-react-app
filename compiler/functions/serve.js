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
  /**
   * all the static assets like images/fonts are bundled together in a `static` directory
   * by webpack and therefore letting Express serve all the reuqests to `/static` path.
  */
  app.use(
    '/static',
    express.static(
      resolvePath(
        FOLDER_NAMES.dist,
        FOLDER_NAMES.static
      )
    )
  );

  /**
   * all the code sourcemaps are bundled together in a `maps` directory by webpack
   * and therefore letting Express serve all the reuqests to `/maps` path.
  */
  app.use(
    '/maps',
    express.static(
      resolvePath(
        FOLDER_NAMES.dist,
        FOLDER_NAMES.maps
      )
    )
  );

  /**
   * favicon is generated at the root in the `dist` and so we need an explicit server
   * route handling for favicon otherwise it won't be loaded.
   */
  app.use(
    '/favicon.ico',
    express.static(
      resolvePath(
        FOLDER_NAMES.dist,
        FILE_NAMES.favicon
      )
    )
  );

  /**
   * all the bundled code chunks are generated in a `js` directory by webpack, and
   * the paths to those bundles are made as www.domain.com/js/main.729728704.js.
   * Therefore, setting this custom API handler to resolve the relevant bundle (either
   * JS or GZIP bundle).
   *
   * Why listen for `/js/*.js`?
   * Why not `*.js`?
   *
   * To avoid collision with other JS files, that may be loaded and served from the client sides.
   * By adding `/js/*.js` we make sure only requests for bundle JS files are routed and end up here.
  */
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
  });

  /**
   * for every path that may occur on the app domain, e.g. (domain.com/some/crazy/path/what),
   * we resolve the `index.html` and react-router takes over and check whether the crazy path
   * exists or not.
   */
  app.get('/*', (_, res) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.sendFile(
      resolvePath(
        FOLDER_NAMES.dist,
        FILE_NAMES.indexHTML
      )
    )
  });

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
