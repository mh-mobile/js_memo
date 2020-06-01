class MemoModel {
  constructor (name, value, createAt, updatedAt) {
    this.name = name
    this.createAt = createAt
    this.updatedAt = updatedAt
    this.value = value
  }
}

module.exports = MemoModel
