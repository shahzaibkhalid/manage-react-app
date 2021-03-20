// TODO: as this file contains common miscs, move this folder to the root
const path = require('path');
const fs = require('fs')
const devCoreConfig = require('../config/devCoreConfig')
const prodCoreConfig = require('../config/prodCoreConfig')

const ENV = {
  dev: 'development',
  prod: 'production'
}

const FILE_NAMES = {
  indexJS: 'index.js',
  indexHTML: 'index.html',
  statsJSON: 'stats.json',
  reportHTML: 'report.html',
  prettierConfig: 'prettier.config.js'
}

const FOLDER_NAMES = {
  config: 'config',
  envs: 'envs',
  src: 'src',
  dist: 'dist',
  components: 'components',
  containers: 'containers',
  hooks: 'hooks',
  pages: 'pages',
  utils: 'utils',
  report: 'report',
  maps: 'maps',
  codeQuality: 'code-quality'
}

const PROJECT_CONFIG_FILES = {
  BASE: 'base',
  DEV: 'development',
  PROD: 'production',
  STAGE: 'staging',
  TEST: 'test'
}

const PROJECT_VARS = {
  PROTOCOL: 'http://',
  HOST: 'localhost',
  DEV_PORT: 3000,
  SERVER_PORT: 5000,
  ANALYZER_SERVER_PORT: 8888
}


function resolvePath(...options) {
  return path.resolve(process.cwd(), ...options)
}

function getEnvBasedCoreConfig(env) {
  return env === ENV.dev
    ? devCoreConfig
    : prodCoreConfig
}

function isDevelopment() {
  return process.env.NODE_ENV !== ENV.prod
}

function getFilesRecursivelyFromDirectory(directoryPath) {
  let fileList = []

  function _readDir(dirPath) {
    let files = fs.readdirSync(dirPath)
    // filter to remove dot files
    files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    files.forEach(file => {
      const absolutePath = path.resolve(dirPath, file)
      if (fs.statSync(absolutePath).isFile()) {
        // TODO: filter to have only code related files
        fileList.push(absolutePath)
      } else if (fs.statSync(absolutePath).isDirectory()) {
        _readDir(absolutePath)
      }
    })
  }

  _readDir(directoryPath)
  return fileList
}

module.exports = {
  ENV,
  FILE_NAMES,
  FOLDER_NAMES,
  PROJECT_CONFIG_FILES,
  PROJECT_VARS,
  resolvePath,
  getEnvBasedCoreConfig,
  isDevelopment,
  getFilesRecursivelyFromDirectory
}
