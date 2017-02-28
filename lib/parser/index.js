const Parser = require('jison').Parser
const grammar = require('./grammar')
const Directive = require('./Directive')
const NginxConfig = require('./NginxConfig')

let parser = new Parser(grammar)
parser.yy.Directive = Directive
parser.yy.NginxConfig = NginxConfig

/**/
let argv = require('yargs').argv
if(argv._[0]) {
  console.log(require('util').inspect(parser.parse(argv._[0].toString())))
}
/**/

module.exports = parser
