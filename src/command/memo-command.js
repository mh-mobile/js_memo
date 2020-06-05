const MemoModel = require('../store/memo-model.js')
const inquirer = require('inquirer')

function MemoCommand (dao) {
  this.dao = dao
}

MemoCommand.prototype.execute = function () {
  throw new Error('execute method must be overridden')
}

MemoCommand.prototype.constructor = MemoCommand

module.exports = {
  MemoCommand,
  MemoModel,
  inquirer
}
