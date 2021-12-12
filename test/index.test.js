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

tap.test('Parse two sentences', test => {
  const twoSentencesChat = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.`
  const expected = [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent : ',
    sentence: 'Aliquam non cursus erat, ut blandit lectus.',
    type: 'agent'
  }]
  const actual = parseChat(twoSentencesChat)
  test.strictSame(actual, expected)
  test.end()
})
