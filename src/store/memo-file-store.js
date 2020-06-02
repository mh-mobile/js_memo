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
          return new MemoModel(memoJson.id, memoJson.content)
        })

        resolve(memos)
      })
    })
  }

  read (id) {
    return this.list().then((memos) => {
      return memos.find((memo) => memo.id === id)
    })
  }

  update (editedMemo) {
    return this.list()
      .then((memos) => {
        const foundIndex = memos.findIndex((memo) => memo.id === editedMemo.id)
        memos.splice(foundIndex, 1, editedMemo)
        return memos
      })
      .then((savedMemos) => {
        fs.writeFile(this.filePath, JSON.stringify(savedMemos), (error) => {
          if (error) {
            throw error
          }
        })
      })
  }

  delete (id) {
    return this.list()
      .then((memos) => {
        return memos.filter((memo) => memo.id !== id)
      })
      .then((savedMemos) => {
        fs.writeFile(this.filePath, JSON.stringify(savedMemos), (error) => {
          if (error) {
            throw error
          }
        })
      })
  }

  create (newMemos) {
    return this.list()
      .then((memos) => {
        return [...memos, ...newMemos]
      })
      .then((savedMemos) => {
        fs.writeFile(this.filePath, JSON.stringify(savedMemos), (error) => {
          if (error) {
            throw error
          }
        })
      })
  }
}

module.exports = MemoFileStore
