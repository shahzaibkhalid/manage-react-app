// TODO: document what is the purpose of different functions
const path = require('path');
const fs = require('fs')
const devCoreConfig = require('../compiler/config/devCoreConfig')
const prodCoreConfig = require('../compiler/config/prodCoreConfig')

const ENV = {
  dev: 'development',
  prod: 'production'
}

const FILE_NAMES = {
  indexJS: 'index.js',
  indexHTML: 'index.html',
  statsJSON: 'stats.json',
  reportHTML: 'report.html',
  prettierConfig: 'prettier.config.js',
  eslintConfig: '.eslintrc.js',
  jestConfig: 'jest.config.js',
  npmLock: 'package-lock.json',
  yarnLock: 'yarn.lock'
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
  codeQuality: 'code-quality',
  test: 'test',
  testUtils: '__test-utils__',
  static: 'static',
  api: 'api',
  theme: 'theme'
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
  return process.env.NODE_ENV === ENV.dev
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

function getFinalWebpackConfig(env) {
  const compiler = require('../compiler')
  const baseProjectSpecificConfig = require(
    resolvePath(
      FOLDER_NAMES.config,
      FOLDER_NAMES.envs,
      PROJECT_CONFIG_FILES.BASE
    )
  );
  const envProjectSpecificConfig = require(
    resolvePath(
      FOLDER_NAMES.config,
      FOLDER_NAMES.envs,
      env
    )
  );
  const finalCompilerConfig = compiler.merge(
    baseProjectSpecificConfig.webpack(),
    envProjectSpecificConfig.webpack()
  );

  return finalCompilerConfig;
}

function getFinalBabelConfig() {
  return {
    /**
     * @plugins
     * A plugin is a single functionality, it takes one form
     * of JavaScript and returns another form of JavaScript.
     * For example, converting ES-modern to ES5
     */
    plugins: [
      /**
       * We're using "react-refresh" package by React's team
       * at Facebook to enable Hot Module Replacement.
       * Note: react-refresh also puts an error overlay to show
       * the errors on the screen (in the browser)
       */
      isDevelopment() ? require.resolve('react-refresh/babel') : {}
    ],
    /**
     * @presets
     * A preset is an array of Babel plugins to glue the
     * related functionality together.
     * Note: Presets are executed from bottom to top
     */
    presets: [
      [
        require.resolve('@babel/preset-react'),
        {
          /**
           * runtime: automatic is choosen to apply the latest JSX Transform
           * after this, we don't have to import React in every JSX file
           * source: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
           * TODO: check if this config options still needs to be here after babel v8
           */
          'runtime': 'automatic'
        }
      ],
      require.resolve('@babel/preset-env'),
    ],
  }
}

function getDirectoryAliases() {
  return {
    [FOLDER_NAMES.pages]: resolvePath(FOLDER_NAMES.src, FOLDER_NAMES.pages),
    [FOLDER_NAMES.containers]: resolvePath(FOLDER_NAMES.src, FOLDER_NAMES.containers),
    [FOLDER_NAMES.components]: resolvePath(FOLDER_NAMES.src, FOLDER_NAMES.components),
    [FOLDER_NAMES.hooks]: resolvePath(FOLDER_NAMES.src, FOLDER_NAMES.hooks),
    [FOLDER_NAMES.utils]: resolvePath(FOLDER_NAMES.src, FOLDER_NAMES.utils),
    [FOLDER_NAMES.testUtils]: resolvePath(FOLDER_NAMES.src, FOLDER_NAMES.testUtils),
    [FOLDER_NAMES.static]: resolvePath(FOLDER_NAMES.src, FOLDER_NAMES.static),
    [FOLDER_NAMES.api]: resolvePath(FOLDER_NAMES.src, FOLDER_NAMES.api),
    [FOLDER_NAMES.theme]: resolvePath(FOLDER_NAMES.src, FOLDER_NAMES.theme),
  }
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
  getFilesRecursivelyFromDirectory,
  getFinalWebpackConfig,
  getFinalBabelConfig,
  getDirectoryAliases
}
