class MemoModel {
  constructor (content, id) {
    this.content = content
    this.id = id
  }

  get name () {
    return this.content.split('\n')[0]
  }

  get value () {
    return this.id
  }
}

module.exports = MemoModel
