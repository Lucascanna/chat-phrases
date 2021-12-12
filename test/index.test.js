'use strict'

const tap = require('tap')
const parseChat = require('../index')

tap.test('Parse single sentence', test => {
  const singleSentence = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  const expected = [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }]
  const actual = parseChat(singleSentence)
  test.strictSame(actual, expected)
  test.end()
})
