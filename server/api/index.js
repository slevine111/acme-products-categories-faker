const express = require('express')
const app = express()
const volleyball = require('volleyball')

app.use(volleyball)

app.get('/', (req, res, next) => {
  res.setEncoding('placeholder')
})

module.exports = app
