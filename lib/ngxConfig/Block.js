function Block(name) {
  this._name = name
}

Block.prototype.setChildren = function(children) {
  this._children = children
}

Block.prototype.setConditionAndChildren = function(condition, children) {
  this._condition = condition
  this._children  = children
}

module.exports = Block
