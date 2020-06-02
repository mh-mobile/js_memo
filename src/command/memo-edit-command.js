const { MemoCommand, MemoModel, inquirer } = require('./memo-command.js')

class MemoEditCommand extends MemoCommand {
  execute () {
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
