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
}

module.exports = FileUtil
