const { MemoCommand, MemoModel } = require('./memo-command.js')
class MemoListCommand extends MemoCommand {
  constructor (dao) {
    super(dao)
    this.name = 'hiro'
  }

  execute () {
    this.dao.list()
  }
}

module.exports = MemoListCommand
