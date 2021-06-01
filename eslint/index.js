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
    es2021: true,
    // setting jest: true makes ESLint realizes Jest globals
    // and other settings
    jest: true
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
  plugins: [
    'testing-library',  //TODO: does it have to be here?
    'no-relative-import-paths'
  ],
  rules: {
    /**
     * After React 17, with new JSX transform, React doesn't need
     * to be in scope anymore, so we can turn this rule off.
     */
    'react/react-in-jsx-scope': 'off',
    //TODO: explain the following rules
    /**
     * If a prop is not required in PropTypes, a default prop must
     * be added.
     */
    'react/require-default-props': 'error',
    /**
     * Any prop in the defaultProps must have a non-required prop-type
     */
    'react/default-props-match-prop-types': 'error',
    /**
     * Any prop with a `bool` prop type must start with `has` or `is`
     */
    'react/boolean-prop-naming': [
      'error',
      { rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' },
    ],
    /**
     * Any <button></button> element must have a type attribute
     */
    'react/button-has-type': 'error',
    /**
     * Any prop, state or context must be destructured to use.
     */
    'react/destructuring-assignment': 'error',
    /**
     * Forbid `className`, `style` to be applied to React components
     * Note: These props can still be applied to HTML elements.
     */
    'react/forbid-component-props': 'error',
    /**
     * Any PropType (or a subset of it) must not be exported and
     * imported into another componet to reuse.
     * Every component must have its own proptypes.
     * Note: If we reuse proptypes, it becomes hard to strip them
     * in production build because webpack see them as a dependency.
     */
    'react/forbid-foreign-prop-types': 'error',
    /**
     * Forbid generic PropTypes like `any`, `object`, `array` and
     * use more specific ones like `objectOf`, `arrayOf` etc.
     */
    'react/forbid-prop-types': 'error',
    'react/function-component-definition': 'error',
    'react/no-array-index-key': 'error',
    'react/no-danger': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-redundant-should-component-update': 'error',
    'react/no-render-return-value': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-unstable-nested-components': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/no-multi-comp': 'error',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-filename-extension': ['error', { allow: 'as-needed' }],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-max-depth': ['error', { max: 5 }],
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-script-url': [
      'error',
      [
        {
          name: 'Link',
          props: ['to'],
        },
      ],
    ],
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-no-bind': 'error',
    'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'on',
        eventHandlerPropPrefix: 'on',
        checkLocalVariables: true,
        checkInlineFunction: true,
      },
    ],


    /**
     * Some core ESLint rules to improve readability and reduced
     * code complexity.
     */


    /**
     * max-lines
     *
     * Total number of lines that can be in a file (JS,JSX).
     * Maximum limit: 300, comments and blank lines are excluded.
     */
    'max-lines': 'error',
    /**
     * complexity
     *
     * A number of different paths a function can take, like `if`
     * `else` conditions or `switch` statements count.
     */
    complexity: ['error', { max: 5 }],
    /**
     * max-depth
     *
     * It determines how many nested blocks (like if/else) are there.
     * More nesting means more complexity and the default allowed nesting
     * for this rule is 4.
     */
    'max-depth': 'error',
     /**
      * max-lines-per-function
      *
      * Maxomum number of lines a function can have (default is configured
      * to be 50).
      *`IIFE: true` means code in in-line IIFES also count as lines.
      * Also, blank lines and comments are configured to not count as lines.
      */
    'max-lines-per-function': [
      'error',
      { IIFEs: true, skipBlankLines: true, skipComments: true },
    ],
    /**
     * max-params
     *
     * A function can have only 5 params as more than 5 means function
     * needs to be split into smaller one to reduce complexity and
     * increase maintainability.
     */
    'max-params': ['error', { max: 5}],
    /**
     * @sort-keys
     *
     * All object keys must be sorted alphabetically.
     */
    'sort-keys': 'error',


    /**
     *
     * Some ESLint rules to have consistent import/export
     *
     */


    /**
     * @sort-imports
     *
     * named imports must be sorted alphabetically. For example:
     * import {b, a} from 'something'; (incorrect)
     * import {a, b} from 'something'; (correct)
     */
     'sort-imports': 'error',
     /**
      * @no-relative-import-paths/no-relative-import-paths
      *
      * As we have a webpack alias to all the root folders, we don't want
      * any relative import in the application as it complicates refactoring
      * and bloats the codebase.
      * `allowSameFolder` means there shouldn't be a relative import even for the
      * same folder like `import Foo from './foo';`
      */
     'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { allowSameFolder: false },
    ],
    /**
     * @import/first
     *
     * Import statements must be at the top of the file.
     * `absolute-first` means among all different type of import statements,
     * absolute imports must be on top.
     * Check `import/order` rule below with a more detailed breakdown on the ordering.
     */
    'import/first': ['error', 'absolute-first'],
    /**
     * @import/exports-last
     *
     * Instead of exporting each individual piece, have an export statement at
     * the end of the file.
     */
    'import/exports-last': 'error',
    /**
     * @import/no-namespace
     *
     * We shouldn't have wildcard imports. For example:
     * import * as React from 'react'; (incorrect)
     * import React from 'react'; (correct)
     */
    'import/no-namespace': 'error',
    /**
     * @import/extensions
     *
     * We shouldn never specifiy extensions in the import path.
     */
    'import/extensions': ['error', 'never'],
    /**
     * @import/newline-after-import
     *
     * A newline must be added between import statements and rest of the code.
     */
    'import/newline-after-import': 'error',
    /**
     * @import/prefer-default-export
     *
     * For a single item to be exported from a module, it must be a default export.
     */
    'import/prefer-default-export': 'error',
    /**
     * @import/max-dependencies
     *
     * A module can have 10 other import statements at max.
     */
    'import/max-dependencies': 'error',
    /**
     * @import/no-unassigned-import
     *
     * Every import must be assigned to a variable, the only exceptions
     * are CSS imports.
     *
     * import 'Foo'; (incorrect)
     * import Foo from 'Foo'; (correct)
     * import 'theme/base.css' (correct)
     */
    'import/no-unassigned-import': ['error', { allow: ['**/*.css'] }],
    /**
     * @import/no-named-default
     *
     * When we import a default export, it must not be named at the time of import.
     * import {default as Foo} from 'Foo'; (incorrect)
     * import Foo from 'Foo'; (correct)
     */
    'import/no-named-default': 'error',
    /**
     * @import/no-anonymous-default-export
     *
     * A default export must never be anonymous.
     * export default {foo: 'bar'};  (incorrect)
     * const theme = {foo: 'bar'}; export default theme; (correct)
     */
    'import/no-anonymous-default-export': 'error',
    /**
     * @import/group-exports
     *
     * Named exports must be grouped together.
     *
     * export { Foo };
     * export { Bar }; (incorrect)
     *
     * export {Foo, Bar}; (correct)
     */
    'import/group-exports': 'error',
    /**
     * @import/dynamic-import-chunkname
     *
     * Every dynamic import must have a webpack magic comment
     * to consistently name the chunkname for persistent caching.
     */
    'import/dynamic-import-chunkname': 'error',
    /**
     * @import/unambiguous
     *
     * Avoid the mismatch between `script` and `module`.
     */
    'import/unambiguous': 'error',
    /**
     * @import/no-commonjs
     *
     * There should be no commonjs modules.
     */
    'import/no-commonjs': 'error',
    /**
     * @import/no-amd
     *
     * There should be no AMD modules.
     */
    'import/no-amd': 'error',
    /**
     * @import/no-nodejs-modules
     *
     * There should be no nodejs modules.
     */
    'import/no-nodejs-modules': 'error',
    /**
     * While `import/first` implies that the import statement should be
     * the first things in the module, `import/order` specifies the order
     * preference for different kinds of import statements.
     */
    'import/order': [
      'error',
      {
        groups: [
          'builtin',  // import path from 'path';
          'external', // import React from 'react';
          'internal', // import Footer from 'components/Footer';
          'parent', // import Foo from '../../Foo'; (not allowed as it's relative)
          'sibling', // import Bar from './Bar';
          'index', // import Main from './';
          'object', // import log from 'console.log'; (only available in TypeScript)
        ],
        /**
         * there should be no newlines between differenet kinds of import statements.
         */
        'newlines-between': 'never',
        /**
         * among similar kind of import statements (like builtin or external, etc.),
         * order must be ascending, and it should not be case sensitive.
         */
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
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
      version: 'detect'
    },
    /**
     * @linkComponents
     *
     * Mostly we don't use anchor tag (<a></a>) directly in React
     * apps as a way to navigate around but abstractions built on
     * top of anchor, e.g. `Link` component in `react-router-dom`.
     * The purpose of this setting is to let `eslint-plugin-react`
     * know that all security and accessability checks applied on
     * anchor (e.g. react/jsx-no-target-blank) must be applied on
     * the `Link` component too, because we use it instead of `a`
     * tag for navigation.
     */
    linkComponents: [{ name: 'Link', linkAttribute: 'to' }],
  },
  /**
   * @ignorePatterns
   * Although when executing ESLint through CLI, we have
   * control to pass what particular directly we want to
   * lint (in our case, just the `src` directory), but for
   * other tools, like editor's extensions, we want to filter
   * out explicitly, all other files except `src` directory.
   */
  ignorePatterns: [
    /**
     * Ignore JavaScript files under all sub-folders under
     * `config` directory.
     * Why being so specific and adding separate sub-folder?
     * Because a folder named `config` may appear in the `src`
     * directory too
     */
    '**/config/envs/*.js',
    '**/config/code-quality/*.js',
    '**/config/test/*.js',
    // Ignore all JavaScript files under `dist` folder
    '**/dist/**/*.js',
  ],
  /**
   * @overrides
   * We have a directory configured (src) when we trigger ESLint checks through
   * the API, but we don't want to trigger test related ESLint checks on the
   * entire source code (src directory), so we override that setting by setting
   * the pattern (files containing `test` or `spec` in their names and being in
   * __tests__ directory) and only for these files, we want to extend the rest
   * of the config and apply `plugin:testing-library/react`
   */
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended'],
      settings: {
        /**
         * @testing-library/utils-module
         *
         * This config conatins the name of our test setup file where we
         * wrap a component to be tested into relevant Providers etc.
         * In our case, the file lives in `__test-utils__` root directory
         * and the file name is `test-utils`
         */
        'testing-library/utils-module': 'test-utils',
        /**
         * @testing-library/custom-renders
         *
         * By default, any custom render function with `render` in the name
         * is recognized by React Testing Library, however, if we want to name
         * our render function in such a way that it doesn't contain the word
         * `render`, we can configure it here.
         *
         * In our case, we are exporting a custom render function from `test-utils`
         * and naming it the same `render`, so this rule is turned off.
         */
        'testing-library/custom-renders': 'off',
        /**
         * @testing-library/custom-queries
         *
         * React Testing Library offers a variety of different built-in queries,
         * however, if we want to have some of our custom queries, we can name them here
         * and React Testing Library will recognize and won't complain about them.
         */
        'testing-library/custom-queries': 'off'
      }
    },
  ],
}

module.exports = baseESLintConfig
