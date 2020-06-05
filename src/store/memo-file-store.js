const MemoStore = require('./memo-store')
const MemoModel = require('./memo-model')
const FileUtil = require('../util/file-util.js')
const fs = require('fs')

function MemoFileStore (filePath) {
  MemoStore.call(this)
  this.filePath = filePath
}
MemoFileStore.prototype = Object.create(MemoStore.prototype)
MemoFileStore.prototype.constructor = MemoFileStore
MemoFileStore.prototype.list = function () {
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

MemoFileStore.prototype.read = function (id) {
  return this.list().then((memos) => {
    return memos.find((memo) => memo.id === id)
  })
}

MemoFileStore.prototype.update = function (editedMemo) {
  return this.list()
    .then((memos) => {
      const foundIndex = memos.findIndex((memo) => memo.id === editedMemo.id)
      memos.splice(foundIndex, 1, editedMemo)
      return memos
    })
    .then((savedMemos) => {
      return FileUtil.writeFileContent(
        this.filePath,
        JSON.stringify(savedMemos)
      )
    })
}

MemoFileStore.prototype.delete = function (id) {
  return this.list()
    .then((memos) => {
      return memos.filter((memo) => memo.id !== id)
    })
    .then((savedMemos) => {
      return FileUtil.writeFileContent(
        this.filePath,
        JSON.stringify(savedMemos)
      )
    })
}

MemoFileStore.prototype.create = function (newMemos) {
  return this.list()
    .then((memos) => {
      return [...memos, ...newMemos]
    })
    .then((savedMemos) => {
      return FileUtil.writeFileContent(
        this.filePath,
        JSON.stringify(savedMemos)
      )
    })
}

module.exports = MemoFileStore
