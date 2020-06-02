const MemoModel = require('../store/memo-model.js')
const os = require('os')
const uuid = require('node-uuid')
const fs = require('fs')

class FileUtil {
  static createTempfilePath () {
    return `${os.tmpdir()}/${uuid.v4()}`
  }

  static readFileContent (filePath) {
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

  static writeFileContent (filePath, data) {
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

  static convertFilePathsToMemos (filePaths) {
    const memoPromises = filePaths.map((filePath) =>
      this.convertFilePathToMemo(filePath)
    )
    return Promise.all(memoPromises)
  }

  static convertFilePathToMemo (filePath) {
    return FileUtil.readFileContent(filePath).then(
      (data) => new MemoModel(uuid.v4(), data)
    )
  }

  static convertStdinToMemos () {
    return FileUtil.readFileContent(process.stdin.fd).then((data) => [
      new MemoModel(uuid.v4(), data)
    ])
  }

  static filePathExists (filePaths) {
    return filePaths && filePaths.length > 0
  }
}

module.exports = FileUtil
