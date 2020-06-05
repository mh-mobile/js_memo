const sqlite3 = require('sqlite3')
const MemoModel = require('./memo-model.js')
const uuid = require('node-uuid')
const MemoStore = require('./memo-store.js')

function MemoSqliteStore (filePath) {
  MemoStore.call(this, filePath)
  this.initTable(filePath)
}

MemoSqliteStore.prototype = Object.create(MemoStore.prototype)
MemoSqliteStore.prototype.constructor = MemoSqliteStore
MemoSqliteStore.prototype.initTable = async function (filePath) {
  this.database = new sqlite3.Database(filePath)
  await this.createTableIfNeeds()
}

MemoSqliteStore.prototype.getDatabase = function () {
  return this.database
}

MemoSqliteStore.prototype.getTableName = function () {
  return 'memos'
}

MemoSqliteStore.prototype.createTableIfNeeds = function () {
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

MemoSqliteStore.prototype.list = function () {
  return new Promise((resolve) => {
    this.getDatabase().serialize(() => {
      this.getDatabase().all(`select * from ${this.getTableName()}`, (error, rows) => {
        if (error) throw error
        const memos = rows.map((row) => {
          return new MemoModel(row.id, row.content)
        })
        resolve(memos)
      })
    })
  })
}

MemoSqliteStore.prototype.read = function (id) {
  return new Promise((resolve, reject) => {
    this.getDatabase().serialize(() => {
      this.getDatabase().get(`select id, content from ${this.getTableName()} where id = "${id}"`, (error, row) => {
        if (error) return reject(error)
        const memo = new MemoModel(uuid.v4(), row.content)
        resolve(memo)
      })
    })
  })
}

MemoSqliteStore.prototype.update = function (editedMemo) {
  return new Promise((resolve, reject) => {
    this.getDatabase().serialize(() => {
      this.getDatabase().run('begin transaction')
      try {
        this.getDatabase().run(`update ${this.getTableName()} set content = "${editedMemo.content}" where id = "${editedMemo.id}"`)
        this.getDatabase().run('commit')
        return resolve()
      } catch (error) {
        this.getDatabase().run('rollback')
        reject(error)
      }
    })
  })
}

MemoSqliteStore.prototype.delete = function (id) {
  return new Promise((resolve, reject) => {
    this.getDatabase().serialize(() => {
      try {
        this.getDatabase().run(`delete from ${this.getTableName()} where id = "${id}"`)
        return resolve()
      } catch (error) {
        reject(error)
      }
    })
  })
}

MemoSqliteStore.prototype.create = function (newMemos) {
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

module.exports = MemoSqliteStore
