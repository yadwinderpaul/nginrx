const fs = require('fs')
const util = require('util')
const nginrx = require('../../../../lib')
const NginrxError = require('../../../errors/nginrxError')
const filterOptions = require('../../helpers/filterOptions')

function checker(argv) {
  let extraOptions = filterOptions(argv, ['file', 'f', 'output', 'o'])
  if(extraOptions.length > 0) {
    throw new Error('Unknown option: '+ extraOptions[0])
  }
  return true
}

exports.command = 'output [options]'
exports.describe = 'Output current nginx configuration in json'

exports.builder = (yargs) => {
  return yargs
    .option('f', {
      alias: 'file',
      describe: 'Write output data to a file',
    })
    .option('o', {
      alias: 'output',
      describe: 'Data output format',
      choices: ['string', 'json', 'object'],
      default : 'object',
    })
    .check(checker)
    .demandCommand(0, 0)
}

exports.handler = (argv) => {
  let config
  try {
    config = nginrx.getNginxConfig()
  } catch(e) {
    throw new NginrxError('Error in getting config', e.message)
  }

  let result = config
  if(argv.output === 'json') {
    result = config.toJson()
  } else if(argv.output === 'string') {
    result = config.toString()
  }

  if(!argv.file) {
    if(argv.output === 'object') {
      console.log(util.inspect(result, null, null))
    } else {
      console.log(result)
    }
  } else {
    try {
      fs.writeFileSync(argv.file, result)
    } catch(e) {
      throw new NginrxError('Error in writing file', e.message)
    }
    console.log('Config successfully written')
  }
}
