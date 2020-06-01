const { MemoCommand } = require('./memo-command.js')

class MemoListCommand extends MemoCommand {
  async execute () {
    const memos = await this.dao.list()
    memos.forEach((memo) => {
      console.log(memo.name)
    })
  }
}

module.exports = MemoListCommand
