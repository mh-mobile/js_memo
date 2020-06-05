function MemoDao (memoStore) {
  this.memoStore = memoStore
}

MemoDao.prototype.constructor = MemoDao
MemoDao.prototype.list = function () {
  return this.memoStore.list()
}
MemoDao.prototype.read = function (id) {
  return this.memoStore.read(id)
}

MemoDao.prototype.update = function (editedMemo) {
  this.memoStore.update(editedMemo)
}

MemoDao.prototype.delete = function (id) {
  return this.memoStore.delete(id)
}

MemoDao.prototype.create = function (newMemos) {
  this.memoStore.create(newMemos)
}

module.exports = MemoDao
