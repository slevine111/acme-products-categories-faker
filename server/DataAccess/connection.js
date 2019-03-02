const Sequelize = require('sequelize')

const connection = new Sequelize(
  process.env.DATABASE_URL ||
    'postgres://localhost/acme_products_categorie_fakers',
  { logging: !process.env.LOGGING === 'false' }
)

module.exports = connection
