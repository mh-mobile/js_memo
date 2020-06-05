const MemoModel = require('../store/memo-model.js')
const os = require('os')
const uuid = require('node-uuid')
const fs = require('fs')

function FileUtil () {}

FileUtil.createTempfilePath = function () {
  return `${os.tmpdir()}/${uuid.v4()}`
}

FileUtil.readFileContent = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        reject(error)
        return
      }

      resolve(data)
    })
  })
}

FileUtil.writeFileContent = function (filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (error) => {
      if (error) {
        reject(error)
        return
      }

      resolve()
    })
  })
}

FileUtil.convertFilePathsToMemos = function (filePaths) {
  const memoPromises = filePaths.map((filePath) =>
    this.convertFilePathToMemo(filePath)
  )
  return Promise.all(memoPromises)
}

FileUtil.convertFilePathToMemo = function (filePath) {
  return FileUtil.readFileContent(filePath).then(
    (data) => new MemoModel(uuid.v4(), data)
  )
}

FileUtil.convertStdinToMemos = function () {
  // 標準入力がない場合の対策
  if (FileUtil.getStdinSize() === 0) return Promise.resolve([])

  // 標準入力からファイルコンテンツを読み込む
  return FileUtil.readFileContent(process.stdin.fd).then((data) => [
    new MemoModel(uuid.v4(), data)
  ])
}

FileUtil.filePathExists = function (filePaths) {
  return filePaths && filePaths.length > 0
}

FileUtil.getStdinSize = function () {
  return fs.fstatSync(process.stdin.fd).size
}

module.exports = FileUtil
