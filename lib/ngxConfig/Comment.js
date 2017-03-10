const Statement = require('./Statement')

class Comment extends Statement {
  constructor(text) {
    super(text)
    this._value = this._text.split('#')[1]
  }

  get value() {
    return this._value
  }

  toJson() {
    return '"#: "'+ this._value + '"'
  }
}

module.exports = Comment
