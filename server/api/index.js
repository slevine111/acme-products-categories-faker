const express = require('express')
const app = express()
const volleyball = require('volleyball')

app.use(volleyball)
app.use('/api/categories/products', require('./routes/products'))
app.use('/api/categories', require('./routes/categories'))

app.get('/', (req, res, next) => {
  res.send('placeholder')
})

module.exports = app
