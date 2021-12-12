'use strict'

const SPACED_COLON = ' : '
const SPACE = ' '
const NEW_LINE = '\n'

function parseLine(line, isLastLine) {
  const [mention, sentence] = line.split(SPACED_COLON)
  const [date, type] = mention.split(SPACE)
  return {
    date,
    mention: mention + SPACED_COLON,
    type: type.toLowerCase(),
    sentence: isLastLine ? sentence : sentence + NEW_LINE
  }
}

module.exports = function parseChat(chatText) {
  const chatLines = chatText.split(NEW_LINE)
  const lastLine = chatLines.pop()
  const parsedLines = chatLines.map(chatLine => parseLine(chatLine, false))
  const lastLineParsed = parseLine(lastLine, true)
  parsedLines.push(lastLineParsed)
  return parsedLines
}