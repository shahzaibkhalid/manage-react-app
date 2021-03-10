const path = require('path');
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
  reportHTML: 'report.html'
}

const FOLDER_NAMES = {
  config: 'config',
  shaizei: 'shaizei',
  src: 'src',
  dist: 'dist',
  components: 'components',
  containers: 'containers',
  hooks: 'hooks',
  pages: 'pages',
  utils: 'utils',
  report: 'report',
  maps: 'maps'
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

module.exports = {
  ENV,
  FILE_NAMES,
  FOLDER_NAMES,
  PROJECT_CONFIG_FILES,
  PROJECT_VARS,
  resolvePath,
  getEnvBasedCoreConfig,
  isDevelopment,
}
