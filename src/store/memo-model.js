
function MemoModel (id, content) {
  this.id = id
  this.content = content
  this.name = this._name()
  this.value = this._value()
}

MemoModel.prototype._name = function () {
  return this.content.split('\n')[0]
}

MemoModel.prototype._value = function () {
  return this.id
}

MemoModel.prototype.constructor = MemoModel

module.exports = MemoModel
