function getBasePrettierConfig() {
  return {
    // prefer single quotes over double
    singleQuote: true,
    // if a property name in object is used which is does not comply,
    // with valid object property names, wrap it string but without
    // wrapping the rest of the properties which comply with the syntax
    quoteProps: 'as-needed',
    // JSX attributs should be formatted with a single quote instead of double
    jsxSingleQuote: true,
  }
}

function mergePrettierConfigWithBase(projectConfig = {}) {
  return Object.assign(
    {},
    getBasePrettierConfig(),
    projectConfig
  )
}

module.exports = { getBasePrettierConfig, mergePrettierConfigWithBase }
