const parser = require('./parser')
const utils = require('./utils')

module.exports = {
  parser: parser,
  getNginxConfig: function() {
    const fileData = utils.getNginxConfigContents()
    return parser.parse(fileData)
  },
}
