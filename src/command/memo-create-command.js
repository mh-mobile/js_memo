const { MemoCommand } = require('./memo-command.js')

class MemoCreateCommand extends MemoCommand {
  execute () {
    this.dao.create()
  }
}

module.exports = MemoCreateCommand
