const Parser = require('jison').Parser
const grammar = require('./grammar')
const NginxConfig = require('./NginxConfig')
const Block = require('./Block')
const Directive = require('./Directive')
const Comment = require('./Comment')

let parser = new Parser(grammar)
parser.yy.NginxConfig = NginxConfig
parser.yy.Block = Block
parser.yy.Directive = Directive
parser.yy.Comment = Comment

/**/
let argv = require('yargs').argv
if(argv._[0]) {
  try {
    console.log(require('util').inspect(parser.parse(argv._[0].toString()), null, null))
  } catch(e) {
    console.log('Error in lexing')
    console.log('message:')
    console.log(e.message)
    console.log()
    console.log('hash:')
    console.log(e.hash)
  }
}
/**/

module.exports = parser
