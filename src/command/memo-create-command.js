const { MemoCommand, MemoModel } = require('./memo-command.js')
const uuid = require('node-uuid')

class MemoCreateCommand extends MemoCommand {
  async execute () {
    const memos = [new MemoModel(uuid.v4(), 'addmemo')]
    await this.dao.create(memos)
  }
}

module.exports = MemoCreateCommand
