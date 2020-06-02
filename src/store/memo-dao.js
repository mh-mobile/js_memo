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

  edit () {
    this.memoStore.edit()
  }

  delete (id) {
    return this.memoStore.delete(id)
  }

  create () {
    this.memoStore.create()
  }
}

module.exports = MemoDao
