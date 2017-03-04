const shell = require('shelljs')

function checkNginxCli() {
  return shell.which('nginx')? true : false
}

function extractVersion(output) {
  // extract version from 'nginx version: nginx/xx.xx.xx (Ubuntu)'
  return output.match(/\d+\.?\d+\.\d+/)[0]
}

module.exports.isInstalled = function() {
  if(checkNginxCli()) {
    return true
  }
  return false
}

module.exports.getVersion = function() {
  if(this.isInstalled()) {
    let output = shell.exec('nginx -v', { silent: true }).stderr
    // nginx cli outputs to stderr instead of stdout

    return extractVersion(output)
  } else {
    return false
  }
}

module.exports.testConfig = function() {

}
