'use strict'

const tap = require('tap')
const parseChat = require('../src/chatParser')

tap.test('Parse single sentence', test => {
  const chatText = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  const expected = [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }]
  const actual = parseChat(chatText)
  test.strictSame(actual, expected)
  test.end()
})

tap.test('Parse two sentences', test => {
  const chatText = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
  const actual = parseChat(chatText)
  test.strictSame(actual, expected)
  test.end()
})

tap.test('Parse four sentences with 2 customer mentions at start', test => {
  const chatText = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
  const actual = parseChat(chatText)
  test.strictSame(actual, expected)
  test.end()
})

tap.test('Parse two sentences not splitted by new line', test => {
  const chatText = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.'
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
  const actual = parseChat(chatText)
  test.strictSame(actual, expected)
  test.end()
})

tap.test('Parse two sentences with a date in the text', test => {
  const chatText = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at 12:24:48, ut blandit lectus.'
  const expected = [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent : ',
    sentence: 'I received it at 12:24:48, ut blandit lectus.',
    type: 'agent'
  }]
  const actual = parseChat(chatText)
  test.strictSame(actual, expected)
  test.end()
})

tap.test('Parse two sentences where both Agent and Customer have fullname', test => {
  const chatText = '14:24:32 Luca Galasso : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Emanuele Querzola : I received the package, ut blandit lectus.'
  const expected = [{
    date: '14:24:32',
    mention: '14:24:32 Luca Galasso : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Emanuele Querzola : ',
    sentence: 'I received the package, ut blandit lectus.',
    type: 'agent'
  }]
  const actual = parseChat(chatText)
  test.strictSame(actual, expected)
  test.end()
})

tap.test('Parse two sentences where without colon after Agent and Customer name', test => {
  const chatText = '14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent I received it at 12:24:48, ut blandit lectus.'
  const expected = [{
    date: '14:24:32',
    mention: '14:24:32 Customer ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent ',
    sentence: 'I received it at 12:24:48, ut blandit lectus.',
    type: 'agent'
  }]
  const actual = parseChat(chatText)
  test.strictSame(actual, expected)
  test.end()
})
