'use strict'

const SPACE = ' '
const CUSTOMER = 'customer'
const AGENT = 'agent'
const mentionPattern = /(\d\d:\d\d:\d\d (?:(?:[\w\s]+ : )|(?:\w+ )))/

function parseLine(mention, sentence, customerName) {
  const [date, senderName] = mention.split(SPACE)
  return {
    date,
    mention,
    type: senderName === customerName ? CUSTOMER : AGENT,
    sentence
  }
}

module.exports = function parseChat(chatText) {
  const [, ...chatFragments] = chatText.split(mentionPattern)
  const [, customerName] = chatFragments[0].split(SPACE)
  return chatFragments.reduce((parsedLines, chatFragment, index) => {
    if (mentionPattern.test(chatFragment)) {
      const sentence = chatFragments[index+1]
      const parsedLine = parseLine(chatFragment, sentence, customerName)
      parsedLines.push(parsedLine)
    }
    return parsedLines
  }, [])
}