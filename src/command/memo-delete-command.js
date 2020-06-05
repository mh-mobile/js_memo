const { MemoCommand, inquirer } = require('./memo-command.js')

function MemoDeleteCommand (dao) {
  MemoCommand.call(this, dao)
}

MemoDeleteCommand.prototype = Object.create(MemoCommand.prototype)
MemoDeleteCommand.prototype.constructor = MemoDeleteCommand
MemoDeleteCommand.prototype.execute = async function () {
  const memos = await this.dao.list()
  if (memos.length === 0) return

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'memo',
        message: 'Choose a note you want to delete:',
        choices: memos
      }
    ])
    .then(async (answers) => {
      const selectedMemo = memos.find((memo) => memo.value === answers.memo)
      await this.dao.delete(selectedMemo.id)
    })
}

module.exports = MemoDeleteCommand
