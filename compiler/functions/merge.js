// this function merges envrionment specific configs along with any overrides from the project etc.
const webpackMerge = require('webpack-merge');
const { getEnvBasedCoreConfig } = require('../../utils')
const commonCoreConfig = require('../config/commonCoreConfig')


/** merge()
 *
 * merge(
 *  config1,
 *  config2,
 *  config3
 *  ...
 * )
 *
 * config3 overrides config2, and config2 overrides config1
 * */

function merge(...configs) {
  //TODO: implement conditional check so that it will work if some project config does not have `webpack`
  return webpackMerge.merge([
    commonCoreConfig.webpack(),
    getEnvBasedCoreConfig(process.env.NODE_ENV).webpack(),
    ...configs
  ])
}

module.exports = merge;
