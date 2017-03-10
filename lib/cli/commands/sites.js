const filterOptions = require('app/cli/helpers/filterOptions')

function checker(argv) {
  let extraOptions = filterOptions(argv, [])
  if(extraOptions.length > 0) {
    throw new Error('Unknown option: '+ extraOptions[0])
  }
  return true
}

exports.command = 'sites <action> [options]'
exports.describe = 'Sites/Server blocks related commands'

exports.builder = (yargs) => {
  return yargs
    .usage('Usage: nginrx sites <action> [options]')
    .commandDir('sitesCmds')
    .check(checker)
    .demandCommand(1, 1)
}

exports.handler = () => {}
