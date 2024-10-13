#!/usr/bin/env node

const { program } = require('commander');

// Basic CLI setup with commander
program
  .version('1.0.0') // This will automatically add --version and -V
  .description('Aura Design CLI tool')
  .option('-h, --help', 'Display help') // no need for --version, commander adds it
  .parse(process.argv);

if (program.help) {
  console.log('Usage: aura [options]');
  console.log('Options:');
  console.log('  -h, --help     Display help');
}
