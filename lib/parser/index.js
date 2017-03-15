const Parser = require('jison').Parser

const ngxModules = require('./ngxModules')
const Config = require('../ngxConfig/Config')
const Block = require('../ngxConfig/Block')
const Directive = require('../ngxConfig/Directive')
const Comment = require('../ngxConfig/Comment')

let parser = new Parser(ngxModules.getGrammar())
parser.yy.Config = Config
parser.yy.Block = Block
parser.yy.Directive = Directive
parser.yy.Comment = Comment

module.exports = parser
