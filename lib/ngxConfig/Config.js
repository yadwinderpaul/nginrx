const Block = require('./Block')
const Comment = require('./Comment')
const indentation = '    '

class Config {
  constructor(statements) {
    this._statements = statements
  }

  get statements() {
    return this._statements
  }

  toString(options) {
    options = options? options : {}
    if(this.statements && this.statements.length > 0) {
      return prettyPrint(this.statements, 0, options)
    } else {
      return ''
    }
  }

  toJson(options) {
    options = options? options : {}
    options.json = true
    if(this.statements && this.statements.length > 0) {
      return '{\n' + indentation.repeat(1) + prettyPrint(this.statements, 1, options) + '\n}'
    } else {
      return '{}'
    }
  }
}

function prettyPrint(statements, indentCount, options) {
  const method = options.json? 'toJson' : 'toString'
  const joiner = options.json? ',\n'+indentation.repeat(indentCount) : '\n'+indentation.repeat(indentCount)

  return statements
    .filter((statement) => {
      return !(!options.comments && statement instanceof Comment)
    })
    .map((statement) => {
      if(statement instanceof Block) {
        if(statement.statements && statement.statements.length > 0) {
          return [
            statement[method]() + ' {',
            indentation.repeat(indentCount + 1) + prettyPrint(statement.statements, indentCount + 1, options),
            indentation.repeat(indentCount) + '}',
          ].join('\n')
        } else {
          return statement[method]() + ' {}'
        }
      } else {
        return statement[method]()
      }
    }).join(joiner)

}

module.exports = Config
