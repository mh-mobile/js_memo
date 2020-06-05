function MemoStore () {}
MemoStore.prototype.constructor = MemoStore

MemoStore.prototype.list = function () {
  throw new Error('list method must be overridden')
}

MemoStore.prototype.read = function () {
  throw new Error('read method must be overridden')
}

MemoStore.prototype.delete = function () {
  throw new Error('delete method must be overridden')
}

MemoStore.prototype.create = function () {
  throw new Error('create method must be overridden')
}

MemoStore.prototype.update = function () {
  throw new Error('update method must be overridden')
}

module.exports = MemoStore
