const chalk = require('chalk')
const filterOptions = require('../../helpers/filterOptions')
const nginxUtil = require('../../../nginxUtil')

function checker(argv) {
  let extraOptions = filterOptions(argv, [])
  if(extraOptions.length > 0) {
    throw new Error('Unknown option: '+ extraOptions[0])
  }

  return true
}

exports.command = 'test'
exports.describe = 'Test current nginx configuration'

exports.builder = (yargs) => {
  return yargs
    .check(checker)
    .demandCommand(0, 0)
}

exports.handler = () => {
  let result = nginxUtil.testConfig()
  if(result.success) {
    console.log(chalk.green('Nginx config ok'))
  } else {
    console.log(chalk.red('Nginx config error: ' +result.error))
  }
}
