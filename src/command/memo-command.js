const MemoModel = require('../store/memo-model.js')
const inquirer = require('inquirer')

class MemoCommand {
  execute () {
    throw new Error('execute method must be overridden')
  }
}

module.exports = {
  MemoCommand,
  MemoModel,
  inquirer
}
