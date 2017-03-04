function Directive(name) {
  this._name = name
}

Directive.prototype.setValue = function(value) {
  this._value = value
}

Directive.prototype.setChildren = function(children) {
  this._children = children
}

Directive.prototype.setConditionAndChildren = function(condition, children) {
  this._condition = condition
  this._children  = children
}

module.exports = Directive
