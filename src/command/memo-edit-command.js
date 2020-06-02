const { MemoCommand, MemoModel, inquirer } = require('./memo-command.js')

class MemoEditCommand extends MemoCommand {
  async execute () {
    const memos = await this.dao.list()

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
        const selectedMemo = memos.find((memo) => memo.value === answers.memo)
        selectedMemo.content = '書き換えたよん！'
        this.dao.update(selectedMemo)
      })
  }
}

module.exports = MemoEditCommand
