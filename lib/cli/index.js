const chalk = require('chalk')
const requireDir = require('require-dir')
const commands = requireDir('./commands')
const package = require(__dirname+'/../../package.json')
const errors = requireDir('../errors')

require('yargs')
  .usage('Usage: $0 <command> [action] [options]')
  .check(checker)
  .commandDir('commands')
  .demandCommand(1)
  .help('help')
  .alias('h', 'help')
  .version(package.version)
  .alias('v', 'version')
  .epilogue('for more information, goto '+ package.homepage)
  .fail((msg, err, yargs) => {
    if(err instanceof errors.nginrxError) {
      console.log(chalk.red(err.message))
    } else {
      console.error(chalk.red(msg), '\n')
      yargs.showHelp()
    }
    process.exit(1)
  })
  .argv

function checker(argv) {
  if(Object.keys(commands).indexOf(argv._[0]) < 0) {
    throw new Error('Unknown command: '+ argv._[0])
  }
  return true
}
