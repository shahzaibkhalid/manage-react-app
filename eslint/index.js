//TODO: export a base config file from here
// TODO: project config file can extend this core config
const baseESLintConfig = {
  //TODO: document all these options
  env: {
    browser: true,
    es6: true
  },
  // what is the order of extends and plugins? does it matter?
  extends: [],
  plugins: [],
  rules: {},
  parserOptions: {}
}

module.exports = baseESLintConfig
