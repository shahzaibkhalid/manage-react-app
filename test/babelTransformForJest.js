/**
 * Why this file exists?
 *
 * As explained in the `transform` property description of
 * the Jest config, Jest doesn't know how to parse non-standard
 * JavaScript, like, JSX. Using an official package named `babel-jest`,
 * we are passing it the same babel config that we pass to webpack.
 * In this way, Jest applies these transformation to the test code and
 * understand non-standards APIs and syntax.
 */
const babelJest = require('babel-jest')
const { getFinalBabelConfig } = require('../utils')

module.exports = babelJest.default.createTransformer(getFinalBabelConfig())
