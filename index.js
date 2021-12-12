'use strict'

const SPACED_COLON = ' : '
const SPACE = ' '

module.exports = function parseChat(chatText) {
  const [mention, sentence] = chatText.split(SPACED_COLON)
  const [date, type] = mention.split(SPACE)
  return [{
    date,
    mention: mention + SPACED_COLON,
    type: type.toLowerCase(),
    sentence
  }]
}