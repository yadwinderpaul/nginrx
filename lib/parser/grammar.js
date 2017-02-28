const _ = require('lodash')
const ngxModules = require('./ngxModules')

const directives = ngxModules.getDirectives()
const directiveLexRules = directives.map((directive) => {
  return [['INITIAL'], directive.name, 'this.begin("STT_CTX");return "'+ directive.name +'";']
})
const directiveBnf = directives.map((directive) => {
  return [directive.name, '$$ = new yy.Directive($1);']
})

const lex = {
  startConditions: {
    INITIAL: '// Default Jison/Lex context',
    STT_CTX: '// statement context',
  },
  rules: _.concat([

    ['\\}',  'return "}";'],
    ['\\;',  'return ";";'],
    ['if',   'return "if";'],
    ['$',    'return "EOF";'],

    [['INITIAL'], '\\s+',      '/* Ignore Whitespace */'],

    [['STT_CTX'], '[A-Za-z0-9\\\-\\\/\\\\\.\\\"\\\"\\\_]+', 'this.popState(); return "VAL";'],

    [['STT_CTX'], '\\s+',      'return "SPACE";'],
    [['STT_CTX'], '\\{',       'this.popState(); return "{";'],

  ], directiveLexRules),
}

const bnf = {
  config: [
    ['statements EOF', '$$ = new yy.NginxConfig($1);return $$;'],
  ],
  statements: [
    ['statements statement', '$$ = $1.concat($2);'],
    ['statement',            '$$ = [$1];'],
  ],
  statement: [
    ['directive SPACE { statements }', '$1.setChildren($4);'],
    ['directive SPACE value ;',        '$1.setValue($3);'],
  ],
  directive: directiveBnf,
  value: [
    ['VAL', '$$ = $1;'],
  ],
}

const grammar = {
  lex: lex,
  bnf: bnf,
}

module.exports = grammar
