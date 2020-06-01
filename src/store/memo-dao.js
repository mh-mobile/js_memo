class MemoDao {
  constructor (memoStore) {
    this.memoStore = memoStore
  }

  async list () {
    const memos = await this.memoStore.list()
    memos.forEach((memo) => {
      console.log(memo.name)
    })
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
