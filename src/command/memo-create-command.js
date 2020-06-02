const { MemoCommand } = require('./memo-command.js')
const FileUtil = require('../util/file-util.js')

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
    if (FileUtil.filePathExists(this.filePaths)) {
      // 引数のファイルからメモを追加
      return FileUtil.convertFilePathsToMemos(this.filePaths)
    } else {
      // 標準入力からメモを追加
      return FileUtil.convertStdinToMemos()
    }
  }
}

module.exports = MemoCreateCommand
