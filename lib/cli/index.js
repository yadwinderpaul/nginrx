const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const package = require(__dirname+'/../../package.json')
const NginrxError = require('../errors/nginrxError')

require('yargs')
  .usage('Usage: nginrx <command> [action] [options]')
  .check(checker)
  .commandDir('./commands')
  .demandCommand(1)
  .help('help')
  .alias('h', 'help')
  .version(package.version)
  .alias('v', 'version')
  .epilogue('for more information, goto '+ package.homepage)
  .fail((msg, err, yargs) => {
    if(err instanceof NginrxError) {
      console.log(chalk.red(err.message))
    } else {
      console.error(chalk.red(msg), '\n')
      yargs.showHelp()
    }
    process.exit(1)
  })
  .argv

function checker(argv) {
  const commands = fs
    .readdirSync(path.resolve(__dirname + '/commands'))
    .filter((file) => {
      return file.match(/\.js$/)
    })
    .map((file) => {
      return file.replace(/.js$/, '')
    })

  if(Object.keys(commands).indexOf(argv._[0]) < 0) {
    throw new Error('Unknown command: '+ argv._[0])
  }
  return true
}
