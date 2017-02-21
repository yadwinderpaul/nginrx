const chalk = require('chalk')
const filterOptions = require('app/cli/helpers/filterOptions')
const nginxUtil = require('app/nginxUtil')

exports.command = 'config <action> [options]',
exports.describe = 'Server basic configuration related commands',

exports.builder = (yargs) => {
  return yargs
    .commandDir('configCmds')
    .check(checker)
    .demandCommand(1, 1)
}

exports.handler = () => {}

let cmds = {
  test: {
    name: 'test',
    description: 'Test current nginx configuration',
    builder: testBuilder,
    handler: testHandler,
  },
  output: {
    name: 'output',
    description: 'Output current nginx configuration in json',
    builder: outputBuilder,
    handler: outputHandler,
  },
}


function testBuilder(yargs) {
  return yargs
    .usage('Usage: $0 config test')
    .check(testChecker)
}

function outputBuilder(yargs) {
  return yargs
    .usage('Usage: $0 config output [options]')
    .option('f', { alias: 'file', describe: 'Output data to a file' })
    .check(outputChecker)
}

function checker(argv) {
  let extraOptions = filterOptions(argv, [])
  if(extraOptions.length > 0) {
    throw new Error('Unknown option: '+ extraOptions[0])
  }
  if(argv._.length === 1) {
    throw new Error('No command provided')
  }
  if(Object.keys(cmds).indexOf(argv._[1] < 0)) {
    throw new Error('Unknown command: '+ argv._[1])
  }
  return true
}

function testChecker(argv) {
  let extraOptions = filterOptions(argv, [])
  if(extraOptions.length > 0) {
    throw new Error('Unknown option: '+ extraOptions[0])
  }
  if(argv._.length > 2) {
    throw new Error('Unknown command: '+ argv._[2])
  }
  return true
}

function outputChecker(argv) {
  let extraOptions = filterOptions(argv, ['file'])
  if(extraOptions.length > 0) {
    throw new Error('Unknown option: '+ extraOptions[0])
  }
  if(argv._.length > 2) {
    throw new Error('Unknown command: '+ argv._[2])
  }
  return true
}

function testHandler() {
  let result = nginxUtil.testConfig()
  if(result.success) {
    console.log(chalk.green('>>> Nginx config ok'))
  } else {
    console.log(chalk.red('>>> result.error'))
  }
}

function outputHandler() {
  console.log(chalk.blue('>>> Handled output command'))
}
