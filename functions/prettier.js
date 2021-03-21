const fs = require('fs')
const _prettier = require('prettier')
const { resolvePath, getFilesRecursivelyFromDirectory, FOLDER_NAMES, FILE_NAMES } = require('../utils')

function prettier() {
  const files = getFilesRecursivelyFromDirectory(
    resolvePath(FOLDER_NAMES.src)
  )
  const finalConfig = require(
    resolvePath(FOLDER_NAMES.config, FOLDER_NAMES.codeQuality, FILE_NAMES.prettierConfig)
  )

  files.forEach(file => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) console.error(err)
      //TODO: befor formatting, we should check whether a file is already formatted
      // TODO: may be through editor autoformatting (using prettier.check)
      // TODO: but does it make things fast?
      fs.writeFile(
        file,
        _prettier.format(
          data,
          {
            ...finalConfig,
            /**
             * @filepath
             * This property is used to infer the file type and applies appropriate parser
             * instead of us manually setting the parser for each file-type which would
             * be very inconvenient.
             */
            filepath: file,
          }
        ),
        (err) => { if (err) console.error(err) }
        //TODO:  add some sort of log to consoles to point out which file is being formatted
        // TODO: also log the closing message that all files are formatted
      )
    })
  })
}

module.exports = prettier
