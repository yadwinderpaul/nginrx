const parser = require('app/parser')
const utils = require('app/utils')

module.exports = {
  parser: parser,
  getNginxConfig: function() {
    const fileData = utils.getNginxConfigContents
    return new parser.parse(fileData)
  },
}
