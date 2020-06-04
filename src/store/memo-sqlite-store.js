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

  getTableName () {
    return 'memos'
  }

  createTableIfNeeds () {
    return new Promise((resolve) => {
      this.getDatabase().serialize(() => {
        this.getDatabase().run(`create table if not exists ${this.getTableName()} (
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
        this.getDatabase().all(`select * from ${this.getTableName()}`, (error, rows) => {
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
    return new Promise((resolve, reject) => {
      this.getDatabase().serialize(() => {
        this.getDatabase().run('begin transaction')
        try {
          newMemos.forEach((memo) => {
            this.getDatabase().run(`insert into ${this.getTableName()} (id, content) values ($id, $content)`, [memo.id, memo.content])
          })
          this.getDatabase().run('commit')
          return resolve()
        } catch (error) {
          this.getDatabase().run('rollback')
          reject(error)
        }
      })
    })
  }
}

module.exports = MemoSqliteStore
