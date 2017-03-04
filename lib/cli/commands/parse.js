const fs = require('fs')
const filterOptions = require('app/cli/helpers/filterOptions')
const parser = require('app/parser')

exports.command = 'parse [string] [options]'
exports.describe = 'Parse the input Nginx config'

exports.builder = (yargs) => {
  return yargs
    .option('f', { alias: 'file', describe: 'Parse this file' })
    .check(checker)
}

exports.handler = (argv) => {
  let string
  if(argv.string) {
    string = argv.string.toString()
  } else if(argv.file) {
    string = fs.readFileSync(argv.file, 'utf-8')
  }
  console.log(require('util').inspect(parser.parse(string), null, null))
}

function checker(argv) {
  let extraOptions = filterOptions(argv, ['f', 'file'])
  if(extraOptions.length > 0) {
    throw new Error('Unknown option: '+ extraOptions[0])
  }

  return true
}
