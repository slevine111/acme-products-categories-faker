const Sequelize = require('sequelize')
const connection = require('../connection')

const Category = connection.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Category
