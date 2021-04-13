//TODO: document why this file exists?
// what is the use of babel-jest?
const babelJest = require('babel-jest')
const { getFinalBabelConfig } = require('../utils')

module.exports = babelJest.createTransformer(getFinalBabelConfig())
