//todo: explain why do we need `@cypress/webpack-preprocessor`
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const { getFinalWebpackConfig, ENV } = require('../utils');

function runBaseCypressPlugins(on, _) {
  //todo: why we do it?
  process.env.NODE_ENV = 'development';
  const options = {
    //todo: explain why ENV.dev is a good approximation for this purpose
    webpackOptions: getFinalWebpackConfig(ENV.dev),
    watchOptions: {},
  }
  // https://github.com/cypress-io/cypress/issues/18435
  // https://github.com/cypress-io/cypress/issues/8900
  // todo: explain this issue in detail
  on('file:preprocessor', webpackPreprocessor(options));
}

module.exports = runBaseCypressPlugins;
