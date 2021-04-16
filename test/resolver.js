/**
 * Why?
 *
 * By default, when Jest try to resolve the path in an
 * import statement like the following:
 *
 * import Footer from 'components/Footer'
 *
 * It tries to find `index.js` in the Footer directory.
 * But in our case, we are using `directory-named-webpack-plugin`
 * to automatically consider the file with the same name as the
 * name of the directory to be the default, instead of `index.js`.
 *
 * But, Jest doesn't know about it, because that was the part of
 * webpack configuration, so we are using an npm package here named
 * `jest-directory-named-resolver` which implements a custom Jest
 * resolver to consider the directory-named file as the default file
 * when resolving a directory.
 */
const jestDirectoryNamedResolver = require('jest-directory-named-resolver')

module.exports = jestDirectoryNamedResolver
