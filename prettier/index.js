function getBasePrettierConfig() {
  // TODO: document these properties
  return {
    singleQuote: true,
    quoteProps: 'as-needed',
    jsxSingleQuote: true,
  }
}

function mergePrettierConfigWithBase(projectConfig) {
  return Object.assign(
    {},
    getBasePrettierConfig(),
    projectConfig
  )
}

module.exports = { getBasePrettierConfig, mergePrettierConfigWithBase }
