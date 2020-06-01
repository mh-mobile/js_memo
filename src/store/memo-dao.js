const MemoFileStore = require('./memo-file-store')
class MemoDao {
  constructor (memoStore) {
    this.memoStore = memoStore
  }
}

module.exports = MemoFileStore
