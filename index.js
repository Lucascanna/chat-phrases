'use strict'

const SPACE = ' '
const mentionPattern = /(\d\d:\d\d:\d\d \w+ : )/

function parseLine(mention, sentence) {
  const [date, type] = mention.split(SPACE)
  return {
    date,
    mention,
    type: type.toLowerCase(),
    sentence
  }
}

module.exports = function parseChat(chatText) {
  const chatFragments = chatText.split(mentionPattern)
  return chatFragments.reduce((parsedLines, chatFragment, index) => {
    if (mentionPattern.test(chatFragment)) {
      const sentence = chatFragments[index+1]
      const parsedLine = parseLine(chatFragment, sentence)
      parsedLines.push(parsedLine)
    }
    return parsedLines
  }, [])
}