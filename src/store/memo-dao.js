class MemoDao {
  constructor (memoStore) {
    this.memoStore = memoStore
  }

  list () {
    return this.memoStore.list()
  }

  read (id) {
    return this.memoStore.read(id)
  }

  update (editedMemo) {
    this.memoStore.update(editedMemo)
  }

  delete (id) {
    return this.memoStore.delete(id)
  }

  create (newMemos) {
    this.memoStore.create(newMemos)
  }
}

module.exports = MemoDao
