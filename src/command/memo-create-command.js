const { MemoCommand } = require('./memo-command.js')

class MemoCreateCommand extends MemoCommand {
  execute () {
    console.log('create memo')
  }
}

module.exports = MemoCreateCommand
