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
  indexJSX: 'index.jsx',
  indexHTML: 'index.html',
  statsJSON: 'stats.json',
  reportHTML: 'report.html',
  prettierConfig: 'prettier.config.js',
  eslintConfig: '.eslintrc.js',
  jestConfig: 'jest.config.js',
  npmLock: 'package-lock.json',
  packageJSON: 'package.json',
  yarnLock: 'yarn.lock',
  favicon: 'favicon.ico',
  globalJestSetup: 'globalJestSetup.js'
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
  theme: 'theme',
  state: 'state'
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

/**
 * @isPackageBeingUsed
 *
 * A simple utility that checks if a package is installed in the application
 * and applies/skip certain configguration based on that.
 */
function isPackageBeingUsed(package) {
  const packageJSON = require(resolvePath(FILE_NAMES.packageJSON))
  return Object.keys(packageJSON.dependencies).includes(package)
    ? true : false;
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
     * Note: Plugins are executed from first to last.
     */
    plugins: [
      /**
       * react-refresh/babel
       *
       * We're using "react-refresh" package by React's team
       * at Facebook to enable Hot Module Replacement.
       * Note: react-refresh also puts an error overlay to show
       * the errors on the screen (in the browser)
       */
      isDevelopment() ? require.resolve('react-refresh/babel') : {},
      /**
       * babel-plugin-styled-components
       *
       * styled-components have a dedicated babel plugin that's not
       * required but having it can be usefule as it does minification
       * of styles and some other things that are configured and explained
       * below.
       * Also, we are only applying this transformation if the application is using
       * `styled-components`, otherwise skipping.
       */
      isPackageBeingUsed('styled-components') ? [
        require.resolve('babel-plugin-styled-components'),
        {
          /**
           * @displayName
           *
           * By default, styled-components create gibberish names of CSS
           * classes and it can become hard to find if a certain HTML element
           * belong to certain styled-component, having this option enabled,
           * CSS classes have a prefix of the component's displayName.
           * Example:
           * `displayName` set to `false`
           * <button class="s12jug-0 elmQyR">Click Me</button>
           * `displayName` set to `true`
           * <button class="Button-s12jug-0 elmQyR">Click Me</button>
           */
          displayName: true,
          /**
           * @pure
           *
           * Setting `pure` to `true` enabled dead code elimination for
           * styled-components.
           */
          pure: true,
          /**
           * @transpileTemplateLiterals
           *
           * We write styled-components's styles in tagged template literals
           * and Babel can definitely transpile those to ES5 but Babel produces
           * a totally spec-compliant ES5 equivalent which is not needed for
           * tagged template literals for styled-components so by setting
           * `transpileTemplateLiterals` to `true`, we are enabling styled-components
           * to transpile only those tagged template literals which contains styles
           * and are attached to `styled` object of styled-components
           */
          transpileTemplateLiterals: true
        }
      ] : {},
      isPackageBeingUsed('@emotion') ||
      isPackageBeingUsed('@theme-ui')
        ? require.resolve('@emotion/babel-plugin'): {},
    ],
    /**
     * @presets
     * A preset is an array of Babel plugins to glue the
     * related functionality together.
     * Note: Presets are executed from bottom to top.
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
          'runtime': 'automatic',
          /**
           * `theme-ui` uses a constraint-based design system approach and exposes an
           * `sx` prop which is definitely not given by the standard JSX runtime, so
           * we can either add pragma comment like `@jsxImportSource theme-ui` to every
           * file or configure the default JSX runtime's source to be theme-ui.
           */
          'importSource': '@theme-ui/core'
        }
      ],
      [
        require.resolve('@babel/preset-env'),
        {
          useBuiltIns: 'usage',
          corejs: "3.0"
        }
      ]
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
    [FOLDER_NAMES.state]: resolvePath(FOLDER_NAMES.src, FOLDER_NAMES.state),
  }
}
/**
 * Count ESLint errors and warnings.
 */
function countErrors(results) {
  let errorCount = 0;
  let warningCount = 0;

  for (const result of results) {
    errorCount += result.errorCount;
    warningCount += result.warningCount;
  }

  return { errorCount, warningCount };
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
  getDirectoryAliases,
  countErrors,
  isPackageBeingUsed
}
