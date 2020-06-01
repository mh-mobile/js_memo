const MemoCommand = require('./memo-list-command.js')
const MemoModel = require('../memo-model.js')
const inquirer = require('inquirer')

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
      })
  }
}

module.exports = MemoEditCommand
