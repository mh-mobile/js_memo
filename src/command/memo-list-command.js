const { MemoCommand } = require('./memo-command.js')

function MemoListCommand (dao) {
  MemoCommand.call(this, dao)
}

MemoListCommand.prototype = Object.create(MemoCommand.prototype)
MemoListCommand.prototype.constructor = MemoListCommand
MemoListCommand.prototype.execute = async function () {
  const memos = await this.dao.list()
  memos.forEach((memo) => {
    console.log(memo.name)
  })
}

module.exports = MemoListCommand
