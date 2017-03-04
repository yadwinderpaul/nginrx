const _ = require('lodash')
const glob = require('glob')

function getDirectives() {
  const ngxModules = glob.sync(__dirname + '/!(index.js)')

  return _.reduce(ngxModules, (result, module) => {
    return result.concat(require(module).getDirectives())
  }, [])
}

function getDirectiveLexRules() {
  const directives = getDirectives()
  return directives.map((directive) => {
    return [['INITIAL'], directive.name, 'this.begin("DIR_CTX");return "DIRECTIVE";']
  })
}

function generateLex() {
  const startConditions = {
    INITIAL: '// Default block context',
    LOC_CTX: '// location block condition context',
    TPS_CTX: '// types block context',
    DIR_CTX: '// directive context',
  }

  const rules = _.concat(
    getDirectiveLexRules(),
    [
      // [['INITIAL'], 'if',       'this.begin("IF_CTX"); return "IF";'],
      [['INITIAL'], 'events',   'return "BLOCK";'],
      [['INITIAL'], 'http',     'return "BLOCK";'],
      [['INITIAL'], 'mail',     'return "BLOCK";'],
      [['INITIAL'], 'server',   'return "BLOCK";'],
      [['INITIAL'], 'location', 'this.begin("LOC_CTX"); return "LOC_BLOCK";'],
      [['INITIAL'], 'types',    'this.begin("TPS_CTX"); return "TPS_BLOCK";'],
    ],
    [
      [['INITIAL'], '\\s+',   '/* Ignore Whitespace */'],
      [['INITIAL'], '#.*\\n', 'return "COMMENT";'],
      [['INITIAL'], '{',      'return "{";'],
      [['INITIAL'], '}',      'return "}";'],
      [['INITIAL'], ';',      'return ";";'],
      [['INITIAL'], '$',      'return "EOF";'],

      [['DIR_CTX'], '\\s+',          'return "SPACE";'],
      [['DIR_CTX'], '[^\\s^;][^;]*', 'this.popState(); return "VAL";'],

      [['LOC_CTX'], '\\s+',          'return "SPACE";'],
      [['LOC_CTX'], '[^\\s^{][^{]*', 'return "CONDITION";'],
      [['LOC_CTX'], '{',             'this.popState(); return "{";'],

      [['TPS_CTX'], '\\s+',          '/* Ignore Whitespace */'],
      [['TPS_CTX'], '{',             'return "{";'],
      [['TPS_CTX'], '[A-Za-z0-9\\.\\-\\+]+\\\/[A-Za-z0-9\\.\\-\\+]+', 'this.begin("DIR_CTX"); return "MIMENAME";'],
      [['TPS_CTX'], ';',             'return ";";'],
      [['TPS_CTX'], '}',             'this.popState(); return "}";'],
    ]
  )

  const lex = {
    startConditions,
    rules,
  }

  return lex
}

function generateBnf() {
  return {
    config: [
      ['statements EOF', '$$ = new yy.Config($1);return $$;'],
    ],
    statements: [
      ['statements statement', '$$ = $1.concat($2);'],
      ['statement',            '$$ = [$1];'],
    ],
    statement: [
      ['block { statements }',                    '$1.setChildren($3);'],
      ['directive SPACE value ;',                 '$1.setValue($3);'],
      ['COMMENT',                                 '$$ = new yy.Comment($1);'],
      ['locBlock SPACE CONDITION { statements }', '$1.setConditionAndChildren($3, $5);'],
      ['typBlock { mimeStatements }',             '$1.setChildren($3);'],
    ],

    block:     [['BLOCK',     '$$ = new yy.Block($1);']],
    directive: [['DIRECTIVE', '$$ = new yy.Directive($1);']],
    value:     [['VAL',       '$$ = $1;']],

    locBlock:  [['LOC_BLOCK', '$$ = new yy.Block($1);']],

    typBlock:  [['TPS_BLOCK', '$$ = new yy.Block($1);']],

    mimeStatements: [
      ['mimeStatements mimeStatement', '$$ = $1.concat($2);'],
      ['mimeStatement',                '$$ = [$1];'],
    ],
    mimeStatement: [
      ['mimeName SPACE value ;', '$1.setValue($3);'],
    ],
    mimeName:  [['MIMENAME', '$$ = new yy.Directive($1);']],
  }
}

module.exports.getGrammar = () => {
  const grammar = {
    lex: generateLex(),
    bnf: generateBnf(),
  }

  return grammar
}
