const { getFinalWebpackConfig, ENV } = require('../utils')

const baseESLintConfig = {
  /**
   * @env
   * Configure what kind of environments this linting
   * configuration will support, we want latest EcmaScript
   * i.e. 2021 and browser.
   * Setting these options enables various globals and ESLint
   * doesn't complain and ask to set them manually.
   */
  env: {
    browser: true,
    es2021: true
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
    // Some recommended rules around import/export
    // written in `eslint-plugin-import`
    'plugin:import/errors',
    'plugin:import/warnings',
    // Some recommended a11y rules for JSX in React
    // written in `eslint-plugin-jsx-a11y`
    'plugin:jsx-a11y/recommended',
    // Some recommended rules to lint RegEx
    // written in `eslint-plugin-clean-regex`
    'plugin:clean-regex/recommended'
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
  },
  /**
   * @settings
   * Setting object contains shared settings that are available to all
   * the rules executed by ESLint.
   */
  settings: {
    /**
     * Interplay of `eslint-import-resolver-webpack` and `eslint-plugin-import`
     *
     * We are using `eslint-plugin-import` to run some of the rules related to
     * importing/exporting modules i.e. ES6 modules. But, we have absolute alias
     * configured in webpack, so intead of doing:
     *
     * import Footer from '../../src/components/Footer'
     *
     * We do the following:
     *
     * import Footer from 'components/Footer'
     *
     * This code works flawlessly because webpack knows where to look for the Footer
     * component once it sees an absolute path.
     *
     * But, here comes the problem. ESLint has no idea about and the `eslint-plugin-import`
     * will start giving error that it can't find a module for `components/Footer`
     *
     * In other words, ESLint should be aware of how our absolute path like `components/Footer`
     * will resolve to a relative path. That's why `eslint-import-resolver-webpack` package
     * exists, it takes the whole webpack config object and finds out the path aliases through
     * resolve object.
     *
     * `import/resolver` -> part of `eslint-plugin-import`
     * `webpack` property -> takes config for `eslint-import-resolver-webpack`
     */
    'import/resolver': {
      webpack: {
        /**
         * Why use `ENV.dev`?
         *
         * webpack config can only be merged once we pass an environment, to narrow down which
         * environment to take, merge it with project base and then merge it further with the
         * core webpack config exposed by `manage-react-app`.
         *
         * -> env specific project config (will override previous)
         * -> base project config (will override previous)
         * -> core manage-react-app config (standard core config that can be extended)
         *
         * Now, because webpack aliases, or path aliases are gonna be the same among different
         * environments, they are envrionment agnostic and technically, whatever environment we
         * choose here, aliases will remain the same so we are passing the `development` environment
         * as a suitable approximation here.
         */
        config: getFinalWebpackConfig(ENV.dev)
      }
    },
    /**
     * eslint-plugin-react package wants this setting to give user
     * explicit control to setup React's version for the linting to
     * perform (may be they enable some check based on the version)
     */
    react: {
      version: 'latest'
    }
  }
}

module.exports = baseESLintConfig
