const { program } = require('commander')
const inquirer = require('inquirer')
const MemoModel = require('./memo-model.js')

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
      getExecCommand(args, opts)()
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
      const memos = [
        new MemoModel('memo1', '1', '', ''),
        new MemoModel('memo2', '2', '', ''),
        new MemoModel('memo3', '3', '', ''),
        new MemoModel('memo4', '4', '', '')
      ]

      memos.forEach((memo) => {
        console.log(memo.name)
      })
    }

    function execReadMemoCommand () {
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
        })
    }

    function execEditMemoCommand () {
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

    function execCreateMemoCommand () {
      console.log('create memo')
    }

    function execDeleteMemoCommand () {
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
            message: 'Choose a note you want to delete:',
            choices: memos
          }
        ])
        .then((answers) => {
          console.info('memo:', answers.memo)
        })
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
