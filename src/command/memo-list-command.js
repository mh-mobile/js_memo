const MemoCommand = require('./memo-command.js')
const MemoModel = require('../memo-model.js')
class MemoListCommand extends MemoCommand {
  constructor () {
    super()
    this.name = 'hiro'
  }

  execute () {
    const memos = [
      new MemoModel('memo1', '1', '', ''),
      new MemoModel('memo2', '2', '', ''),
      new MemoModel('memo3', '3', '', ''),
      new MemoModel('memo4', '4', '', '')
    ]

    memos.forEach((memo) => {
      console.log(memo.name)
    })
  }
}

module.exports = MemoListCommand
