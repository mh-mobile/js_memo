const { program } = require('commander')
program
  .option('-l, --list', 'list memos')
  .option('-d --delete', 'delete memo')
  .option('-r --read', 'read memo')
  .option('-e --edit', 'edit memo')
program.parse(process.argv)
