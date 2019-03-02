const Category = require('./Category')
const Product = require('./Product')

const setAssociations = () =>
  Promise.all([Category.hasMany(Product), Product.belongsTo(Category)])

module.exports = {
  Category,
  Product,
  setAssociations
}
