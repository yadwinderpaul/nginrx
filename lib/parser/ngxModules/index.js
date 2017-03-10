function generateLex() {
  const lex = {
    rules: [
      ['\\s+', '// whitespace'],
      ['{',    'return "{";'],
      ['}',    'return "}";'],
      [';',    'return ";";'],
      ['$',    'return "EOF";'],

      ['#.*\\n',   'return "COMMENT";'],
      ['[^;^{]+;', 'return "DIRECTIVE";'],
      ['[^;^{]+',  'return "BLOCK";'],
    ],
  }

  return lex
}

function generateBnf() {
  return {
    config: [
      ['statements EOF', '$$ = new yy.Config($1); return $$;'],
    ],

    statements: [
      ['statements statement', '$$ = $1.concat($2);'],
      ['statement',            '$$ = [$1];'],
    ],

    statement: [
      ['blockDefinition { statements }', '$1.statements = $3; $$ = $1;'],
      ['DIRECTIVE',                      '$$ = new yy.Directive($1);'],
      ['COMMENT',                        '$$ = new yy.Comment($1);'],
    ],

    blockDefinition: [
      ['BLOCK', '$$ = new yy.Block($1);'],
    ],
  }
}

module.exports.getGrammar = () => {
  const grammar = {
    lex: generateLex(),
    bnf: generateBnf(),
  }

  return grammar
}
