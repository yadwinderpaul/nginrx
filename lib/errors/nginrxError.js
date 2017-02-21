const util = require('util')

function NginxError(message) {  
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = message
}

util.inherits(NginxError, Error)

module.exports = NginxError
