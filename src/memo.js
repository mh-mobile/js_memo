const { program } = require('commander')
program
  .option('-l, --list', 'list memos')
  .option('-d --delete', 'delete memo')
  .option('-r --read', 'read memo')
  .option('-e --edit', 'edit memo')
program.parse(process.argv)

try {
  const execCommand = getExecCommand(program.args, program.opts())
  execCommand()
} catch (e) {
  console.log('error: invalid options')
}

function getExecCommand (args, cliOpts) {
  // 有効なオプションのオブジェクトを生成
  const validKeys = Object.keys(cliOpts).filter((key) => cliOpts[key])
  const opts = validKeys.reduce((result, key) => {
    result[key] = cliOpts[key]
    return result
  }, {})

  // オプションが２つの場合、不正なコマンド
  if (Object.keys(opts).length === 2) {
    throw new Error('Error: invalid options')
  }

  // オプションなしの場合の処理
  // 標準入力からメモを作成
  if (Object.keys(opts).length === 0) {
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
