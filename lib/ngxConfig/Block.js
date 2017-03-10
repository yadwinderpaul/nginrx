class Block {
  constructor(definition) {
    this._definition = definition.trim()
    this._name = this._definition.split(' ')[0]
  }

  get name() {
    return this._name
  }

  set statements(statements) {
    this._statements = statements
  }

  get statements() {
    return this._statements
  }

  toString() {
    return this._definition
  }

  toJson() {
    return '"' + this._definition + '":'
  }
}

module.exports = Block
