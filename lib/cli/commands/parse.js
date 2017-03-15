const fs = require('fs')
const util = require('util')
const filterOptions = require('../helpers/filterOptions')
const parser = require('../../parser')
const NginrxError = require('../../errors/nginrxError')

function checker(argv) {
  let extraOptions = filterOptions(argv, ['f', 'file', 'o', 'output'])
  if(extraOptions.length > 0) {
    throw new Error('Unknown option: '+ extraOptions[0])
  }

  return true
}

exports.command = 'parse [string] [options]'
exports.describe = 'Parse the input Nginx config and output to console'

exports.builder = (yargs) => {
  return yargs
    .usage('Usage: nginrx parse [string] [options]')
    .option('f', {
      alias: 'file',
      describe: 'Parse this file',
    })
    .option('o', {
      alias: 'output',
      describe: 'Data output format',
      choices: ['string', 'json', 'object'],
      default : 'object',
    })
    .check(checker)
}

exports.handler = (argv) => {
  if(!argv.string && !argv.file) {
    throw new NginrxError('Need at-least a string or a file to parse')
  }

  let string
  if(argv.string) {
    string = argv.string.toString()
  } else if(argv.file) {
    string = fs.readFileSync(argv.file, 'utf-8')
  }

  const config = parser.parse(string)

  if(argv.output === 'json') {
    console.log(config.toJson())
  } else if(argv.output === 'object') {
    console.log(util.inspect(config, null, null))
  } else {
    console.log(config.toString())
  }
}
