const { MemoCommand, MemoModel, inquirer } = require('./memo-command.js')

class MemoReadCommand extends MemoCommand {
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
          message: 'Choose a note you want to see:',
          choices: memos
        }
      ])
      .then((answers) => {
        const selectedMemo = memos.find((memo) => memo.value === answers.memo)
        console.info('memo:', selectedMemo.name)
        this.dao.read()
      })
  }
}

module.exports = MemoReadCommand
