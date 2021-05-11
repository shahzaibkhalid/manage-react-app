// all shared checks goes here
const fs = require('fs')
const BranchNameLint = require('branch-name-lint')
const lintCommitMessage = require('@commitlint/lint').default
const { rules: commitLintBaseRules } = require('@commitlint/config-conventional')
const commitLintFormat = require('@commitlint/format').default
const eslint = require('../functions/eslint')
const test = require('../functions/test')
const { resolvePath, FILE_NAMES } = require('../utils')

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

  return eslint()
    .then(results => {
      const { errorCount, warningCount } = countErrors(results)
      process.exitCode = (errorCount || warningCount) ? 1 : 0;
      //TODO: explain your intention with this piece of code
      if (process.exitCode === 1) {
        console.log('Lint checks failed! ❌')
        process.exit(1)
      } else {
        console.log('All lint checks are passing! ✅')
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

  const yarnLockFileExists = fs.existsSync(yarnLockPath)
  const npmLockFileExists = fs.existsSync(npmLockPath)

  if (npmLockFileExists) {
    console.error(`${FILE_NAMES.npmLock} exists! ❌`)
    process.exit(1)
  }

  if (!yarnLockFileExists) {
    console.error(`${FILE_NAMES.yarnLock} does not exist! ❌`)
    process.exit(1)
  }

  if (yarnLockFileExists && !npmLockFileExists) {
    console.log(`${FILE_NAMES.yarnLock} exists! ✅`)
    console.log(`${FILE_NAMES.npmLock} does not exist! ✅`)
    process.exitCode = 0
  }
}

function branchNameCICheck() {
  const branchNameLint = new BranchNameLint({
    // only a branch with these prefixes are allowed
    prefixes: [
      'feature',
      'bugfix',
      'hotfix',
      'performance',
      'prerelease',
      'release',
      'documentation',
      'tests',
      'tools'
    ],
    // following suggestions can be offered for common error
    // for example: use `feature` instead of `feature`
    suggestions: {
      features: 'feature',
      feat: 'feature',
      fix: 'bugfix',
      releases: 'release'
    },
    // pushing to the following branches is not allowed
    disallowed: [
      'main',
      'master',
      'develop',
      'staging'
    ],
  });

  const processCode = branchNameLint.doValidation();
  if (processCode === 1) {
    console.log('Some git branch lint checks failed! ❌');
    process.exit(1);
  } else {
    console.log('All Git branch lint checks passed! ✅');
    process.exitCode = 0;
  }
}

function commitMessageCICheck() {
  const commitMessage = fs.readFileSync(process.argv[2], 'utf8').trim()
  return lintCommitMessage(
      commitMessage,
      commitLintBaseRules
    ).then(report => {
      process.stdout.write(commitLintFormat({results: [report]}, {helpUrl: 'https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional'}))
      if (report.errors.length > 0 || report.warnings.length > 0) {
        process.exit(1)
      } else {
        process.stdout.write('All commit message checks passed! ✅')
      }
    }).catch(error => {
      console.error('commitMessageCICheck failed: ', error)
    })
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
 * 4) check formatting of commit message ✅
 * 5) run performance audit (TBD if this has to be on pre-push?)
 * 6) check branch name ✅
 * 7) format source code
 */
