const fs = require('fs')
const _prettier = require('prettier')
const { resolvePath, getFilesRecursivelyFromDirectory, FOLDER_NAMES, FILE_NAMES } = require('../compiler/utils')

function prettier() {
  const files = getFilesRecursivelyFromDirectory(
    resolvePath(FOLDER_NAMES.src)
  )
  files.forEach(file => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) console.error(err)
      //TODO: befor formatting, we should check whether a file is already formatted
      // TODO: may be through editor autoformatting (using prettier.check)
      fs.writeFile(
        file,
        _prettier.format(
          data,
          // TODO: merge the configs here
          {
            trailingComma: 'all',
            jsxSingleQuote: true,
            jsxBracketSameLine: false,
            filepath: file,
          }
        ),
        (err) => { if (err) console.error(err) }
      )
    })
  })
}

module.exports = prettier
