const MemoModel = require('../store/memo-model.js')
const inquirer = require('inquirer')

class MemoCommand {
  constructor (dao) {
    this.dao = dao
  }

  execute () {
    throw new Error('execute method must be overridden')
  }
}

module.exports = {
  MemoCommand,
  MemoModel,
  inquirer
}
