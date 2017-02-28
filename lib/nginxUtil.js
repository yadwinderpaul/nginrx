const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const parser = require('./parser')

module.exports = {
  isInstalled() {
    if(checkNginxCli()) {
      return true
    }
    return false
  },

  getVersion() {
    if(this.isInstalled()) {
      let output = shell.exec('nginx -v', { silent: true }).stderr
      // nginx cli outputs to stderr instead of stdout

      return extractVersion(output)
    } else {
      return false
    }
  },

  testConfig() {

  },

  getConfig() {
    let confFileContents = fs.readFileSync(path.resolve('./nginx.conf'), 'utf-8')
    return confFileContents
  },

  getConfigTree() {
    return parser.getTree(this.getConfig())
  },
}

function checkNginxCli() {
  return shell.which('nginx')? true : false
}

function extractVersion(output) {
  // extract version from 'nginx version: nginx/xx.xx.xx (Ubuntu)'
  return output.match(/\d+\.?\d+\.\d+/)[0]
}
