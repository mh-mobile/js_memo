const sqlite3 = require('sqlite3')

class MemoSqliteStore {
  constructor (filePath) {
    this.initTable(filePath)
  }

  async initTable (filePath) {
    this.database = new sqlite3.Database(filePath)
    await this.createTableIfNeeds()
  }

  getDatabase () {
    return this.database
  }

  createTableIfNeeds () {
    return new Promise((resolve) => {
      this.getDatabase().serialize(() => {
        this.getDatabase().run(`create table if not exists memos (
          id text primary key,
          content text
        )`)
      })
      return resolve()
    })
  }
}

module.exports = MemoSqliteStore
