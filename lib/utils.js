const fs = require('fs')
const path = require('path')
const glob = require('glob')
const _ = require('lodash')

const defaultConfigFile = '/etc/nginx/nginx.conf'

function addIncludedFiles(fileData) {
  const include = fileData.match(/include[\t\s]+(.*);/)
  if(include) {
    const split = fileData.split(include[0])
    const globbedFiles = glob.sync(include[1])

    let insertData = ''

    if(globbedFiles && globbedFiles.length > 0) {
      insertData = _.reduce(globbedFiles, (result, file) => {
        return result + '\n' + fs.readFileSync(path.resolve(file), 'utf-8')
      }, '')
    }

    fileData = split[0] + insertData + split[1]
    return addIncludedFiles(fileData)

  } else {
    return fileData
  }
}

function getNginxConfigContents(config) {
  const configFile = config && config.file? config.file : defaultConfigFile
  // to do: find nginx config else fail

  const fileData = fs.readFileSync(path.resolve(configFile), 'utf-8')
  return addIncludedFiles(fileData)
}

module.exports.getNginxConfigContents = getNginxConfigContents
