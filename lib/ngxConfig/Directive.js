const Statement = require('./Statement')

class Directive extends Statement {
  constructor(text) {
    super(text)

    let noComma = this._text.replace(/;$/, '')
    if(noComma.match(/\s/)) {
      this._name = noComma.match(/^[^\s]+\s/)[0].trim()
      this._value = noComma.match(/\s.*$/)[0].trim()
    } else {
      this._name = noComma
      this._value = null
    }
  }

  get name() {
    return this._name
  }

  get value() {
    return this._value
  }

  toJson() {
    return '"' + this._name +'": "'+ this._value + '"'
  }
}

module.exports = Directive
