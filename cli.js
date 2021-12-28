#! /usr/bin/env node

import { program, Option } from 'commander';

import start from './functions/start.js';
import build from './functions/build.js';
import serve from './functions/serve.js';
import analyze from './functions/analyze.js';
import prettier from './functions/prettier.js';
import eslint from './functions/eslint.js';
import test from './functions/test.js';
import init from './functions/init.js';
import e2e from './functions/e2e.js';
import audit from './functions/audit.js';

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
  .command('audit')
  .alias('ad')
  .description('Run Lighthouse audit')
  .action(audit);

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
