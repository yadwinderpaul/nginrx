const chalk = require('chalk')
const filterOptions = require('app/cli/helpers/filterOptions')
const nginxUtil = require('app/nginxUtil')

exports.command = 'status'
exports.describe = 'Get status of Nginx server'

exports.builder = (yargs) => {
  return yargs
    .check(checker)
    .demandCommand(0, 0)
}

exports.handler = () => {
  let nginxVersion = nginxUtil.getVersion()
  if(nginxVersion) {
    console.log(chalk.green('>>> Nginx installed, Version: '+ nginxVersion))
  } else {
    console.log(chalk.red('>>> Nginx not installed'))
  }
}

function checker(argv) {
  let extraOptions = filterOptions(argv, [])
  if(extraOptions.length > 0) {
    throw new Error('Unknown option: '+ extraOptions[0])
  }

  return true
}
