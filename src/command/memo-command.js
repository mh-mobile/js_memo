class MemoCommand {
  execute () {
    throw new Error('execute method must be overridden')
  }
}

module.exports = MemoCommand
