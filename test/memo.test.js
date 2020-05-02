const Memo = require('../src/memo')
test('read file', () => {
  expect('aaa').toBe('aaa')
})

test('delete test', () => {
  expect(new Memo().delete()).toBe('deleted')
})
