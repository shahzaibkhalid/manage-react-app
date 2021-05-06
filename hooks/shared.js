// all shared checks goes here
const fs = require('fs')
const eslint = require('../functions/eslint')
const test = require('../functions/test');
const { resolvePath, FILE_NAMES } = require('../utils');

function eslintCICheck() {
  function countErrors(results) {
    let errorCount = 0;
    let warningCount = 0;

    for (const result of results) {
        errorCount += result.errorCount;
        warningCount += result.warningCount;
    }

    return { errorCount, warningCount };
  }

  eslint()
    .then(results => {
      const { errorCount, warningCount } = countErrors(results)
      process.exitCode = (errorCount || warningCount) ? 1 : 0;
      //TODO: explain your intention with this piece of code
      if (process.exitCode === 1) {
        process.exit(1)
      }
    })
    .catch(error => {
      console.log('Failed to apply eslintCICheck: ')
      console.error(error)
    })
}

function testCICheck() {
  test()
}

function lockFileCICheck() {
  const yarnLockPath = resolvePath(FILE_NAMES.yarnLock)
  const npmLockPath = resolvePath(FILE_NAMES.npmLock)

  fs.promises.access(yarnLockPath, fs.constants.F_OK)
    .then(() => {
      console.log(`${FILE_NAMES.yarnLock} exists! ✅`)
      fs.promises.access(npmLockPath, fs.constants.F_OK)
        .then(() => {
          console.error(`${FILE_NAMES.npmLock} exists! ❌`)
          process.exit(1)
        })
        .catch(() => {
          console.log(`${FILE_NAMES.npmLock} does not exist! ✅`)
          process.exitCode = 0;
        })
    })
    .catch(() => {
      console.error(`${FILE_NAMES.yarnLock} does not exist! ❌`)
      process.exit(1)
    })
}

function branchNameCICheck() {
  //TODO: implement branch name check here.
}

function commitMessageCICheck() {
  //TODO: implement commit message check here.
}


module.exports = {
  eslintCICheck,
  testCICheck,
  lockFileCICheck,
  branchNameCICheck,
  commitMessageCICheck
}

//TODO: implement checks here.
/**
 * CHECKS
 * 1) check tests ✅
 * 2) check ESLint ✅
 * 3) check Lockfile ✅
 * 4) check formatting of commit message
 * 5) run performance audit (TBD if this has to be on pre-push?)
 * 6) check branch name
 * 7) format source code
 */
