const { MemoCommand, inquirer } = require('./memo-command.js')

function MemoReadCommand (dao) {
  MemoCommand.call(this, dao)
}

MemoReadCommand.prototype = Object.create(MemoCommand.prototype)
MemoReadCommand.prototype.constructor = MemoReadCommand
MemoReadCommand.prototype.execute = async function () {
  const memos = await this.dao.list()
  if (memos.length === 0) return

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

module.exports = MemoReadCommand
