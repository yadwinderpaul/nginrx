const NginrxError = require('app/errors/nginrxError')

exports.command = 'sites <action> [options]'
exports.describe = 'Sites/Server blocks related commands'

exports.builder = {}

exports.handler = () => {
  throw new NginrxError('Sites command not defined yet')
}
