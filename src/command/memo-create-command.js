const { MemoCommand, MemoModel } = require('./memo-command.js')
const uuid = require('node-uuid')
const fs = require('fs')

class MemoCreateCommand extends MemoCommand {
  constructor (dao, filePaths) {
    super(dao)
    this.filePaths = filePaths
  }

  async execute () {
    const memos = await this.createMemos()
    if (memos.length === 0) return
    await this.dao.create(memos)
  }

  async createMemos () {
    if (this.filePathExists()) {
      // 引数のファイルからメモを追加
      return this.convertFilePathsToMemos()
    } else {
      // 標準入力からメモを追加
      return this.convertStdinToMemos()
    }
  }

  convertFilePathsToMemos () {
    const memoPromises = this.filePaths.map((filePath) =>
      this.convertFilePathToMemo(filePath)
    )
    return Promise.all(memoPromises)
  }

  convertFilePathToMemo (filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (error, data) => {
        if (error) {
          reject(error)
          return
        }

        const memo = new MemoModel(uuid.v4(), data)
        resolve(memo)
      })
    })
  }

  convertStdinToMemos () {
    return new Promise((resolve, reject) => {
      fs.readFile(process.stdin.fd, 'utf-8', (error, data) => {
        if (error) {
          reject(error)
          return
        }

        const memo = new MemoModel(uuid.v4(), data)
        resolve([memo])
      })
    })
  }

  filePathExists () {
    return this.filePaths && this.filePaths.length > 0
  }
}

module.exports = MemoCreateCommand
