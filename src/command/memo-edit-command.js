const { MemoCommand, inquirer } = require('./memo-command.js')
const FileUtil = require('../util/file-util.js')
const childProcess = require('child_process')

function MemoEditCommand (dao) {
  MemoCommand.call(this, dao)
}

MemoEditCommand.prototype = Object.create(MemoCommand.prototype)
MemoEditCommand.prototype.execute = async function () {
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
    .then(async (answers) => {
      const selectedMemo = memos.find((memo) => memo.value === answers.memo)
      const tempfilePath = FileUtil.createTempfilePath()

      // 編集用のメモを一時ファイルに書き込み
      await FileUtil.writeFileContent(tempfilePath, selectedMemo.content)

      // 外部エディタを起動
      // ref. https://stackoverflow.com/questions/9122282/how-do-i-open-a-terminal-application-from-node-js
      const editor = process.env.EDITOR || 'vi'
      const child = childProcess.spawn(editor, [tempfilePath], {
        stdio: 'inherit'
      })

      child.on('exit', async () => {
        // 一時ファイルのコンテンツを取得し、メモを更新
        const content = await FileUtil.readFileContent(tempfilePath)
        selectedMemo.content = content
        this.dao.update(selectedMemo)
      })
    })
}

MemoEditCommand.prototype.constructor = MemoEditCommand

module.exports = MemoEditCommand
