const Category = require('./Category')
const Product = require('./Product')
const { commerce } = require('faker')

const setAssociations = () =>
  Promise.all([Category.hasMany(Product), Product.belongsTo(Category)])

Category.getAllData = function() {
  return this.findAll({ include: Product })
}

Category.createNewCategory = function() {
  return this.create({ name: commerce.department() })
}

Category.deleteCategory = function(id) {
  return Product.destroy({ where: { categoryId: id } }).then(() =>
    Category.destroy({ where: { id } })
  )
}

Product.createNewProduct = function(categoryId) {
  return Product.create({ name: commerce.productName(), categoryId })
}

Product.deleteProduct = function(id) {
  return Product.destroy({ where: { id } })
}

module.exports = {
  Category,
  Product,
  setAssociations
}
