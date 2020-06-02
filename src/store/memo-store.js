class MemoStore {
  list () {
    throw new Error('list method must be overridden')
  }

  read (id) {
    throw new Error('read method must be overridden')
  }

  update (editedMemo) {
    throw new Error('edit method must be overridden')
  }

  delete (id) {
    throw new Error('delete method must be overridden')
  }

  create (newMemos) {
    throw new Error('create method must be overridden')
  }
}

module.exports = MemoStore
