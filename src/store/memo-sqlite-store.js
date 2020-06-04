const sqlite3 = require('sqlite3')
const MemoModel = require('./memo-model.js')
const uuid = require('node-uuid')

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

  list () {
    return new Promise((resolve) => {
      this.getDatabase().serialize(() => {
        this.getDatabase().all('select * from memos', (error, rows) => {
          if (error) throw error
          const memos = rows.map((row) => {
            return new MemoModel(uuid.v4(), row.content)
          })
          resolve(memos)
        })
      })
    })
  }

  read (id) {
  }

  update (editedMemo) {
  }

  delete (id) {
  }

  create (newMemos) {
  }
}

module.exports = MemoSqliteStore
