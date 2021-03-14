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
      // TODO: write a separate function to handle parser type by reading the file extension
      fs.writeFile(file, _prettier.format(data, {trailingComma: 'all', jsxSingleQuote: true, jsxBracketSameLine: false, parser: file.includes('.html') ? 'html' : 'babel'}), (err) => {
        if (err) console.error(err)
      })
    })
  })
}

module.exports = prettier
