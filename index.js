#! /usr/bin/env node

const { program } = require('commander')
const start = require('./functions/start')
const build = require('./functions/build')
const serve = require('./functions/serve')
const analyze = require('./functions/analyze')

program
  .command('start <env>')
  .alias('s')
  .description('Start the development server')
  .action(start);
program
  .command('build <env>')
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

program.parse(process.argv);
