//todo: explain why do we need `@cypress/webpack-preprocessor`
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const { getFinalWebpackConfig, ENV } = require('../utils');

function runBaseCypressPlugins(on, _) {
  //todo: why we do it?
  process.env.NODE_ENV = 'development';
  const options = {
    /**
     * Why do we pass DEV webpack config to Cypress?
     * Because it's a good approximation for our tests to run
     * just like regular code which is also served through DEV env
     */
    webpackOptions: getFinalWebpackConfig(ENV.dev),
    watchOptions: {},
  }
  // https://github.com/cypress-io/cypress/issues/18435
  // https://github.com/cypress-io/cypress/issues/8900
  // todo: explain this issue in detail
  on('file:preprocessor', webpackPreprocessor(options));
}

module.exports = runBaseCypressPlugins;
