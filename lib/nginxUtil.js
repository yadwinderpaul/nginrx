const shell = require('shelljs')

const NginrxError = require('app/errors/nginrxError')

function checkNginxCli() {
  return shell.which('nginx')? true : false
}

function extractVersion(output) {
  // extract version from 'nginx version: nginx/xx.xx.xx (Ubuntu)'
  return output.match(/\d+\.?\d+\.\d+/)[0]
}

function isInstalled() {
  if(checkNginxCli()) {
    return true
  }
  return false
}

function extractError(output) {
  const firstLine = output.split(/\n/)[0]
  const secondLine = output.split(/\n/)[1]
  const secondLineArray = secondLine.split(' ')
  const lastWord = secondLineArray[secondLineArray.length - 1]

  if(lastWord === 'failed') {
    return firstLine.replace('nginx: ', '')
  } else {
    return false
  }
}

exports.getVersion = function() {
  if(!isInstalled()) { throw new NginrxError('Nginx not installed') }

  let output = shell.exec('nginx -v', { silent: true }).stderr
  // nginx cli outputs to stderr instead of stdout

  return extractVersion(output)
}

exports.testConfig = function() {
  if(!isInstalled()) { throw new NginrxError('Nginx not installed') }

  let output = shell.exec('nginx -t', { silent: true }).stderr
  // nginx cli outputs to stderr instead of stdout

  let error = extractError(output)
  if(error) {
    return {
      success: false,
      error: error,
    }
  } else {
    return {
      success: true,
    }
  }
}
