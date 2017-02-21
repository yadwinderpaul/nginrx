const chalk = require('chalk')
const filterOptions = require('app/cli/helpers/filterOptions')
const nginxUtil = require('app/nginxUtil')
const NginrxError = require('app/errors/nginrxError')

exports.command = 'test',
exports.describe = 'Test current nginx configuration',

exports.builder = (yargs) => {
  return yargs
    .check(checker)
    .demandCommand(0, 0)
}

exports.handler = () => {
  throw new NginrxError('Command not defined yet')
  let result = nginxUtil.testConfig()
  if(result.success) {
    console.log(chalk.green('>>> Nginx config ok'))
  } else {
    console.log(chalk.red('>>> result.error'))
  }
}


function checker(argv) {
  let extraOptions = filterOptions(argv, [])
  if(extraOptions.length > 0) {
    throw new Error('Unknown option: '+ extraOptions[0])
  }

  return true
}
