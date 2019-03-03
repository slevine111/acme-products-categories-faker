const path = require('path')
const express = require('express')
const app = express()
const volleyball = require('volleyball')

app.use(volleyball)
app.use('/api/categories/products', require('./routes/products'))
app.use('/api/categories', require('./routes/categories'))
app.use('/public', express.static(path.join(__dirname, '..', '..', 'public')))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'))
})

module.exports = app
