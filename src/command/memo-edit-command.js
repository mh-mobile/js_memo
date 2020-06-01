const { MemoCommand, MemoModel, inquirer } = require('./memo-command.js')

class MemoEditCommand extends MemoCommand {
  execute () {
    const memos = [
      new MemoModel('memo1', '1', '', ''),
      new MemoModel('memo2', '2', '', ''),
      new MemoModel('memo3', '3', '', ''),
      new MemoModel('memo4', '4', '', '')
    ]

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'memo',
          message: 'What memo do you edit.',
          choices: memos
        }
      ])
      .then((answers) => {
        console.info('memo:', answers.memo)
        this.dao.edit()
      })
  }
}

module.exports = MemoEditCommand
