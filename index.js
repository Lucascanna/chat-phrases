'use strict'

const fs = require('fs')
const parseChat = require('./src/chatParser')

const chatPath = `data/${process.argv[2]}`
const chatText = fs.readFileSync(chatPath, { encoding: 'utf-8'})

console.log(parseChat(chatText))

