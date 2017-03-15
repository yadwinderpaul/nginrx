const chalk = require('chalk')
const filterOptions = require('../helpers/filterOptions')
const nginxUtil = require('../../nginxUtil')
const NginrxError = require('../../errors/nginrxError')

function checker(argv) {
  let extraOptions = filterOptions(argv, [])
  if(extraOptions.length > 0) {
    throw new Error('Unknown option: '+ extraOptions[0])
  }

  return true
}

exports.command = 'status'
exports.describe = 'Get status of Nginx server'

exports.builder = (yargs) => {
  return yargs
    .usage('Usage: nginrx status')
    .check(checker)
    .demandCommand(0, 0)
}

exports.handler = () => {
  try {
    let nginxVersion = nginxUtil.getVersion()
    console.log(chalk.green('Nginx installed, Version: '+ nginxVersion))
  } catch(e) {
    throw new NginrxError(e)
  }
}
