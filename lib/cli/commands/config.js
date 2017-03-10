exports.command = 'config <action> [options]'
exports.describe = 'Server basic configuration related commands'

exports.builder = (yargs) => {
  return yargs
    .usage('Usage: nginrx config <action> [options]')
    .commandDir('configCmds')
    .demandCommand(1, 1)
}

exports.handler = () => {}
