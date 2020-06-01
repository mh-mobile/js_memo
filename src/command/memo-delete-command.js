const { MemoCommand, MemoModel, inquirer } = require('./memo-command.js')

class MemoDeleteCommand extends MemoCommand {
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
          message: 'Choose a note you want to delete:',
          choices: memos
        }
      ])
      .then((answers) => {
        console.info('memo:', answers.memo)
        this.dao.delete()
      })
  }
}

module.exports = MemoDeleteCommand
