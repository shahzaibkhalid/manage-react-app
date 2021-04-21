const path = require('path')
const child_process = require('child_process')
const chmodr = require('chmodr')

function init() {
  const pathToHooks = path.resolve(__dirname, '..', 'hooks')
  try {
    chmodr(
      pathToHooks,
      0o755,
      (err) => {
        if (err) throw err
      }
    )
    child_process.execSync(`git config core.hooksPath ${pathToHooks}`)
  } catch(err) {
    console.error('Unable to initiate the configuration for the project')
    console.error(err)
    process.exit(1)
  }
  console.log('Happy Hacking! 🎉')
}

module.exports = init
