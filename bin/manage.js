#!/usr/bin/env node

var program = require ('commander')
  , fs = require('fs')
  , createProjectCommand = require('../commands/createProjectCommand.js')
  , deleteProjectCommand = require('../commands/deleteProjectCommand.js');

program
  .version(JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version)
  .usage('<command> [options]');

// var nodeCommand = process.argv[0]
//   , args = process.argv.slice(2);

function onErr(err) { console.log('There was a problem, please check your options'); return 1; }

program
  .command('create-project [project_name]')
  .description('Creates basic project on repository')
  .option("-P, --project-extensions [project_extension ...]", "use project extension(s)", createProjectCommand.project_extensions)
  .option("-S, --short-project-extensions [true|false]", "use short project extension(s)", false)
  .option("-W, --without-project-extensions [true|false]", "without project extension(s)", false)
  .action(createProjectCommand.execute)
  .usage('<project_name>');

program
  .command('delete-project [project_name]')
  .description('Deletes given project from repository')
  .option("-P, --project-extensions [project_extension ...]", "use project extension(s)", deleteProjectCommand.project_extensions)
  .option("-W, --without-project-extensions [true|false]", "without project extension(s)", false)
  .action(deleteProjectCommand.execute)
  .usage('<project_name>');

program.parse(process.argv);
