const _ = require('lodash')
const glob = require('glob')

const modules = glob.sync(__dirname + '/!(index.js)')

module.exports = {
  getDirectives() {
    return _.reduce(modules, (result, module) => {
      return result.concat(require(module).getDirectives())
    }, [])
  },
}
