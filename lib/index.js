const fs = require('fs')
const path = require('path')
const glob = require('glob')
const _ = require('lodash')

const configFile = 'file.conf'

function collectNginxConfig() {
  let fileData = fs.readFileSync(path.resolve(configFile), 'utf-8')
  return addIncludedFiles(fileData)
}

function addIncludedFiles(fileData) {
  let include = fileData.match(/include[\t\s]+(.*);/)
  if(include) {
    let split = fileData.split(include[0])
    let insertData = ''
    let globbedFiles = glob.sync(include[1])
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

let completeData = collectNginxConfig()

// console.log(completeData)
// console.log('\n\n\n\n\n')
console.log(require('util').inspect(require('./parser').parse(completeData), null, null))
