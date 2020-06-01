class MemoDao {
  constructor (memoStore) {
    this.memoStore = memoStore
  }

  list () {
    this.memoStore.list()
  }

  read () {
    this.memoStore.read()
  }

  edit () {
    this.memoStore.edit()
  }

  delete () {
    this.memoStore.delete()
  }

  create () {
    this.memoStore.create()
  }
}

module.exports = MemoDao
