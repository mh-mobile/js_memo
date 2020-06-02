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
      return this.convertMemos(this.filePaths)
    } else {
      return Promise.resolve([])
    }
  }

  convertMemos (filePaths) {
    const memoPromises = filePaths.map((filePath) => this.convertMemo(filePath))
    return Promise.all(memoPromises)
  }

  convertMemo (filePath) {
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

  filePathExists () {
    return this.filePaths && this.filePaths.length > 0
  }
}

module.exports = MemoCreateCommand
