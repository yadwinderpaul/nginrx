const Parser = require('jison').Parser

const ngxModules = require('app/parser/ngxModules')
const Config = require('app/ngxConfig/Config')
const Block = require('app/ngxConfig/Block')
const Directive = require('app/ngxConfig/Directive')
const Comment = require('app/ngxConfig/Comment')

let parser = new Parser(ngxModules.getGrammar())
parser.yy.Config = Config
parser.yy.Block = Block
parser.yy.Directive = Directive
parser.yy.Comment = Comment

module.exports = parser
