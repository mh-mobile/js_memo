const { MemoCommand } = require('./memo-command.js')

function MemoListCommand (dao) {
  MemoCommand.call(this, dao)
}

MemoListCommand.prototype = Object.create(MemoCommand.prototype)
MemoListCommand.prototype.execute = async function () {
  const memos = await this.dao.list()
  memos.forEach((memo) => {
    console.log(memo.name)
  })
}

MemoListCommand.prototype.constructor = MemoListCommand

module.exports = MemoListCommand
