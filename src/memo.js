const { program } = require('commander')

class Main {
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
      const execCommand = getExecCommand(args, opts)
      execCommand()
    } catch (e) {
      console.log('error: invalid options')
    }

    function getExecCommand (args, opts) {
      // 有効なオプションのオブジェクトを生成
      const validOpts = getValidOpts(opts)

      // オプションが２つの場合、不正なコマンド
      if (Object.keys(validOpts).length === 2) {
        throw new Error('Error: invalid options')
      }

      // オプションなしの場合の処理
      // 標準入力からメモを作成
      if (Object.keys(validOpts).length === 0) {
        return execCreateMemoCommand
      }

      // オプションありの場合の処理
      // 通常の引数が指定された場合は不正な引数
      if (args.length > 0) {
        throw new Error('Error: invalid args')
      }

      // 削除オプション
      if (opts.delete) {
        return execDeleteMemoCommand
      }

      // 参照オプション
      if (opts.read) {
        return execReadMemoCommand
      }

      // 編集オプション
      if (opts.edit) {
        return execEditMemoCommand
      }

      // 一覧オプション
      if (opts.list) {
        return execListMemosComand
      }

      // 上記以外は不正なオプション
      throw new Error('Error: invalid options')
    }

    function execListMemosComand () {
      console.log('list memo')
    }

    function execReadMemoCommand () {
      console.log('read memo')
    }

    function execEditMemoCommand () {
      console.log('edit memo')
    }

    function execCreateMemoCommand () {
      console.log('create memo')
    }

    function execDeleteMemoCommand () {
      console.log('delete memo')
    }

    function getValidOpts (opts) {
      const validKeys = Object.keys(opts).filter((key) => opts[key])
      return validKeys.reduce((result, key) => {
        result[key] = opts[key]
        return result
      }, {})
    }
  }
}

new Main(process.argv).run(program.args, program.opts())
