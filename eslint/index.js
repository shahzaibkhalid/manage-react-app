const baseESLintConfig = {
  //TODO: document all these options
  // TODO: check and fix prettier rules if they conflict here
  env: {
    browser: true,
    es6: true
  },
  /**
   * @extends
   * We can extend from other config packages. Usually, config
   * packages does not implement new rules, rather contains
   * certain ESLint configuration that we just want to drop in.
   * -> Package name format: eslint-config-package-name
   * -> Order in which rules are applied: top to bottom
   */
  extends: [
    // Some recommended JavaScript rules by ESLint (given as default)
    'eslint:recommended',
    // Some recommended React-specific rules written
    // in `eslint-plugin-react`
    'plugin:react/recommended',
    // Some recommended React Hooks specific rules
    // written in `eslint-plugin-react-hooks`
    'plugin:react-hooks/recommended',
  ],
  /**
   * @plugins
   * Plugins usually contains implementation of new rules and then
   * expose those rules so that ESLint can run and check.
   * -> Package name format: eslint-plugin-package-name
   * -> Order in which rules are applied: top to bottom
   */
  plugins: [],
  rules: {
    /**
     * After React 17, with new JSX transform, React doesn't need
     * to be in scope anymore, so we can turn this rule off.
     */
    'react/react-in-jsx-scope': 'off'
  },
  /**
   * @parserOptions
   * This object contains configuration options centering around
   * parsing for various different file types.
   */
  parserOptions: {
    // We want to parse the features in ECMAScript's latest
    // i.e. 2021 specification
    ecmaVersion: 2021,
    // We want to apply ESLint on ES Modules, and not on individual
    // scripts (the other option is 'script')
    // Unless we explicitly set it, 'import', 'export' etc. does not work
    sourceType: 'module',
    // This enables JSX support (as it's not enabled by default)
    ecmaFeatures: {
      jsx: true,
    }
  }
}

module.exports = baseESLintConfig
