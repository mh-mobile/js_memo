const MemoStore = require('./memo-store')
const MemoModel = require('./memo-model')
const fs = require('fs')
class MemoFileStore extends MemoStore {
  constructor (filePath) {
    super()
    this.filePath = filePath
  }

  list () {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf-8', (error, data) => {
        if (error) {
          if (error.code === 'ENOENT') {
            resolve([])
            return
          }

          reject(error)
          return
        }

        const jsonArray = JSON.parse(data)
        const memos = jsonArray.map((memoJson) => {
          return new MemoModel(memoJson.content, memoJson.id)
        })

        resolve(memos)
      })
    })
  }

  read (id) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf-8', (error, data) => {
        if (error) {
          if (error.code === 'ENOENT') {
            resolve([])
            return
          }

          reject(error)
          return
        }

        const jsonArray = JSON.parse(data)
        const memos = jsonArray.map((memoJson) => {
          return new MemoModel(memoJson.content, memoJson.id)
        })
        const foundMemo = memos.find((memo) => memo.id === id)
        resolve(foundMemo)
      })
    })
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
