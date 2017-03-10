class Statement {
  constructor(text) {
    this._text = text.trim()
  }

  get text() {
    return this._text
  }

  toString() {
    return this._text
  }

  toJson() {
    throw new Error('method \'toJson\' not implemented')
  }
}

module.exports = Statement
