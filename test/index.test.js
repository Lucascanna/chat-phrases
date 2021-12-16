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

tap.test('Parse four sentences with 2 customer mentions at start', test => {
  const fourSentencesChat = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.
14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.
14:28:28 Customer : Contrary to popular belief, Lorem Ipsum is not simply random text.`
  const expected = [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
    type: 'customer'
  }, {
    date: '14:27:00',
    mention: '14:27:00 Customer : ',
    sentence: 'Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n',
    type: 'customer'
  }, {
    date: '14:27:47',
    mention: '14:27:47 Agent : ',
    sentence: 'Vestibulum tempor diam eu leo molestie eleifend.\n',
    type: 'agent'
  }, {
    date: '14:28:28',
    mention: '14:28:28 Customer : ',
    sentence: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
    type: 'customer'
  }]
  const actual = parseChat(fourSentencesChat)
  test.strictSame(actual, expected)
  test.end()
})

tap.test('Parse two sentences not splitted by new line', test => {
  const twoSentencesChat = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.'
  const expected = [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
