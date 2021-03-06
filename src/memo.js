const { program } = require('commander')
const OptionUtil = require('./util/option-util.js')
const MemoListCommand = require('./command/memo-list-command.js')
const MemoCreateCommand = require('./command/memo-create-command.js')
const MemoReadCommand = require('./command/memo-read-command.js')
const MemoEditCommand = require('./command/memo-edit-command.js')
const MemoDeleteCommand = require('./command/memo-delete-command.js')
const MemoFileStore = require('./store/memo-file-store.js')
const MemoSqliteStore = require('./store/memo-sqlite-store.js')
const MemoDao = require('./store/memo-dao.js')

function MemoCLI (argv) {
  program
    .name('memo')
    .usage('[options] [file ...]')
    .option('-l, --list', 'list memos')
    .option('-d --delete', 'delete memo')
    .option('-r --read', 'read memo')
    .option('-e --edit', 'edit memo')
  program.parse(argv)
}

MemoCLI.prototype.constructor = MemoCLI
MemoCLI.prototype.run = function (args, opts) {
  try {
    getExecCommand(args, opts)()
  } catch (e) {
    console.log(`${e}`)
  }

  function getExecCommand (args, opts) {
    const memoDao = new MemoDao(new MemoFileStore('data/memo.json'))
    // const memoDao = new MemoDao(new MemoSqliteStore('data/memo.sqlite3'))

    // 有効なオプションのオブジェクトを生成
    const validOpts = OptionUtil.getValidOpts(opts)

    // オプションが２つの場合、不正なコマンド
    if (Object.keys(validOpts).length === 2) {
      throw new Error('invalid options')
    }

    // オプションなしの場合の処理
    // 標準入力からメモを作成
    if (Object.keys(validOpts).length === 0) {
      const createCommand = new MemoCreateCommand(memoDao, args)
      return createCommand.execute.bind(createCommand)
    }

    // オプションありの場合の処理
    // 通常の引数が指定された場合は不正な引数
    if (args.length > 0) {
      throw new Error('invalid args')
    }

    // 削除オプション
    if (opts.delete) {
      const deleteCommand = new MemoDeleteCommand(memoDao)
      return deleteCommand.execute.bind(deleteCommand)
    }

    // 参照オプション
    if (opts.read) {
      const readCommand = new MemoReadCommand(memoDao)
      return readCommand.execute.bind(readCommand)
    }

    // 編集オプション
    if (opts.edit) {
      const editCommand = new MemoEditCommand(memoDao)
      return editCommand.execute.bind(editCommand)
    }

    // 一覧オプション
    if (opts.list) {
      const listCommand = new MemoListCommand(memoDao)
      return listCommand.execute.bind(listCommand)
    }

    // 上記以外は不正なオプション
    throw new Error('invalid options')
  }
}

new MemoCLI(process.argv).run(program.args, program.opts())
