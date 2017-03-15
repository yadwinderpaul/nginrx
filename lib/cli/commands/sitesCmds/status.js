const filterOptions = require('../../helpers/filterOptions')
const nginrx = require('../../../../lib')

function checker(argv) {
  let extraOptions = filterOptions(argv, [])
  if(extraOptions.length > 0) {
    throw new Error('Unknown option: '+ extraOptions[0])
  }

  return true
}

exports.command = 'status'
exports.describe = 'Status of active nginx sites'

exports.builder = (yargs) => {
  return yargs
    .check(checker)
    .demandCommand(0, 0)
}

exports.handler = () => {
  const config = nginrx.getConfig()
  const sites = config.find('block', 'server')
  
  if(sites.length > 0) {
    console.log(sites.length, 'active nginx sites')
    sites.forEach((site) => {
      console.log(site.server_name)
    })
  } else {
    console.log('No active nginx site')
  }
}
