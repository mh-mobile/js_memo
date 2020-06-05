const { MemoCommand } = require('./memo-command.js')
const FileUtil = require('../util/file-util.js')

function MemoCreateCommand (dao, filePaths) {
  MemoCommand.call(this, dao, filePaths)
  this.filePaths = filePaths
}

MemoCreateCommand.prototype = Object.create(MemoCommand.prototype)

MemoCreateCommand.prototype.execute = async function () {
  const memos = await this.createMemos()
  if (memos.length === 0) return
  await this.dao.create(memos)
}

MemoCreateCommand.prototype.createMemos = async function () {
  if (FileUtil.filePathExists(this.filePaths)) {
    // 引数のファイルからメモを追加
    return FileUtil.convertFilePathsToMemos(this.filePaths)
  } else {
    // 標準入力からメモを追加
    return FileUtil.convertStdinToMemos()
  }
}

MemoCreateCommand.prototype.constructor = MemoCreateCommand

module.exports = MemoCreateCommand
