const NginrxError = require('../../errors/nginrxError')

exports.command = 'plugins <action> [options]'
exports.describe = 'Plugins related commands'

exports.builder = {}

exports.handler = () => {
  throw new NginrxError('Plugins command not defined yet')
}

