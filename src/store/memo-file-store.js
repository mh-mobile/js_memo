const MemoStore = require('./memo-store')
class MemoFileStore extends MemoStore {
  constructor (filePath) {
    super()
    this.filePath = filePath
  }

  list () {
    console.log('list store')
  }

  read () {
    console.log('read store')
  }

  edit () {
    console.log('edit store')
  }

  delete () {
    console.log('delete store')
  }

  create () {
    console.log('create store')
  }
}

module.exports = MemoFileStore
