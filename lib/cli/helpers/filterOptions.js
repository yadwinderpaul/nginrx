const _ = require('lodash')
const defaultOptions = ['$0', '_', 'help', 'h', 'version', 'v']

module.exports = (argv, optionsToFilter) => {
  const allOptions = _.difference(_.keys(argv), defaultOptions)
  return _.difference(allOptions, optionsToFilter)
}
