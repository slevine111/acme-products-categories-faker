const Sequelize = require('sequelize')
const connection = require('../connection')

const Product = connection.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Product
