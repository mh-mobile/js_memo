class MemoModel {
  constructor (id, content) {
    this.id = id
    this.content = content
  }

  get name () {
    return this.content.split('\n')[0]
  }

  get value () {
    return this.id
  }
}

module.exports = MemoModel
