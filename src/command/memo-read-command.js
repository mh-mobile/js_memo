const { MemoCommand, MemoModel, inquirer } = require('./memo-command.js')

class MemoReadCommand extends MemoCommand {
  async execute () {
    const memos = await this.dao.list()

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'memo',
          message: 'Choose a note you want to see:',
          choices: memos
        }
      ])
      .then(async (answers) => {
        const selectedMemo = memos.find((memo) => memo.value === answers.memo)
        const memo = await this.dao.read(selectedMemo.id)
        console.log(memo.content)
      })
  }
}

module.exports = MemoReadCommand
