const chalk = require('chalk')
const filterOptions = require('app/cli/helpers/filterOptions')

exports.command = 'output [options]',
exports.describe = 'Output current nginx configuration in json',

exports.builder = (yargs) => {
  return yargs
    .option('f', { alias: 'file', describe: 'Output data to a file' })
    .check(checker)
    .demandCommand(0, 0)
}

exports.handler = () => { console.log(chalk.blue('>>> Handled output command')) }

function checker(argv) {
  let extraOptions = filterOptions(argv, ['file'])
  if(extraOptions.length > 0) {
    throw new Error('Unknown option: '+ extraOptions[0])
  }
  if(argv._.length > 2) {
    throw new Error('Unknown command: '+ argv._[2])
  }
  return true
}
