#! /usr/bin/env node

const { program, Option } = require('commander')
const start = require('./functions/start')
const build = require('./functions/build')
const serve = require('./functions/serve')
const analyze = require('./functions/analyze')
const prettier = require('./functions/prettier')
const eslint = require('./functions/eslint')
const test = require('./functions/test')
const init = require('./functions/init')
const e2e = require('./functions/e2e')

program
  .command('start [env]')
  .alias('s')
  .description('Start the development server')
  .action(start);

program
  .command('build [env]')
  .alias('b')
  .description('Build the application')
  .action(build);

program
  .command('serve')
  .alias('h')
  .description('Serve the bundled code')
  .action(serve);

program
  .command('analyze')
  .alias('a')
  .description('Analyze the bundle')
  .action(analyze);

program
  .command('prettier')
  .alias('p')
  .description('Prettify the source code')
  .action(prettier);

program
  .command('lint')
  .option('-f, --fix', 'Autofix lint errors')
  .alias('l')
  .description('Run ESLint on the source code')
  .action(eslint);

program
  .command('test')
  .alias('t')
  .option('-w, --watch', 'Watch mode for Jest')
  .description('Test the application')
  .action(test);

program
  .command('init')
  .alias('i')
  .description('Configure a new application')
  .action(init);

program
  .command('e2e')
  .alias('e')
  .addOption(new Option(
      '-m, --mode <type>',
      'Run Cypress on terminal or through dedicated UI'
    ).choices(['run', 'open']).default('open')
  )
  .description('Run e2e tests')
  .action(e2e);

program.parse(process.argv);
