const { program } = require('commander')
const OptionUtil = require('./util/option-util.js')
const MemoListCommand = require('./command/memo-list-command.js')
const MemoCreateCommand = require('./command/memo-create-command.js')
const MemoReadCommand = require('./command/memo-read-command.js')
const MemoEditCommand = require('./command/memo-edit-command.js')
const MemoDeleteCommand = require('./command/memo-delete-command.js')

class MemoCLI {
  constructor (argv) {
    program
      .name('memo')
      .usage('[options] [file ...]')
      .option('-l, --list', 'list memos')
      .option('-d --delete', 'delete memo')
      .option('-r --read', 'read memo')
      .option('-e --edit', 'edit memo')
    program.parse(argv)
  }

  run (args, opts) {
    try {
      this.getExecCommand(args, opts)()
    } catch (e) {
      console.log(`error: ${e}`)
    }
  }

  getExecCommand (args, opts) {
    // 有効なオプションのオブジェクトを生成
    const validOpts = OptionUtil.getValidOpts(opts)

    // オプションが２つの場合、不正なコマンド
    if (Object.keys(validOpts).length === 2) {
      throw new Error('Error: invalid options')
    }

    // オプションなしの場合の処理
    // 標準入力からメモを作成
    if (Object.keys(validOpts).length === 0) {
      const createCommand = new MemoCreateCommand()
      return createCommand.execute.bind(createCommand)
    }

    // オプションありの場合の処理
    // 通常の引数が指定された場合は不正な引数
    if (args.length > 0) {
      throw new Error('Error: invalid args')
    }

    // 削除オプション
    if (opts.delete) {
      const deleteCommand = new MemoDeleteCommand()
      return deleteCommand.execute.bind(this)
    }

    // 参照オプション
    if (opts.read) {
      const readCommand = new MemoReadCommand()
      return readCommand.execute.bind(readCommand)
    }

    // 編集オプション
    if (opts.edit) {
      const editCommand = new MemoEditCommand()
      return editCommand.execute.bind(editCommand)
    }

    // 一覧オプション
    if (opts.list) {
      const listCommand = new MemoListCommand()
      return listCommand.execute.bind(listCommand)
    }

    // 上記以外は不正なオプション
    throw new Error('Error: invalid options')
  }
}

new MemoCLI(process.argv).run(program.args, program.opts())
