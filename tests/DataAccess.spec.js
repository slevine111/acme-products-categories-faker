const { Op } = require('sequelize')
const { expect } = require('chai')
const syncAndSeed = require('../server/DataAccess/seed')
const { Product, Category } = require('../server/DataAccess/models/index')

beforeEach(() => {
  return syncAndSeed()
})

describe('Models in Database', () => {
  describe('The Category model', () => {
    it('it has name field', () => {
      return Category.create({ name: 'test' }).then(category => {
        expect(category.name).to.be.ok
        expect(category.name).to.equal('test')
      })
    })
    it('name field is required', () => {
      let error
      return Category.create()
        .then(() => {
          error = 'Noooo'
        })
        .catch(err => {
          error = err.message
        })
        .then(() => {
          expect(error).to.equal(
            'notNull Violation: category.name cannot be null'
          )
        })
    })
    it("name field can't be empty", () => {
      let error
      return Category.create({ name: '' })
        .then(() => {
          error = 'Noooo'
        })
        .catch(() => {
          error = 'error has occured'
        })
        .then(() => {
          expect(error).to.equal('error has occured')
        })
    })
  })

  describe('The Product model', () => {
    it('it has name field', () => {
      return Product.create({ name: 'product' }).then(product => {
        expect(product.name).to.be.ok
        expect(product.name).to.equal('product')
      })
    })
    it('name field is required', () => {
      let error
      return Product.create()
        .then(() => {
          error = 'Noooo'
        })
        .catch(err => {
          error = err.message
        })
        .then(() => {
          expect(error).to.equal(
            'notNull Violation: product.name cannot be null'
          )
        })
    })
    it("name field can't be empty", () => {
      let error
      return Product.create({ name: '' })
        .then(() => {
          error = 'Noooo'
        })
        .catch(() => {
          error = 'error has occured'
        })
        .then(() => {
          expect(error).to.equal('error has occured')
        })
    })
    it('it has foreign key that references Category model', () => {
      return Product.findOne({ where: { name: 'sql' } }).then(product => {
        expect(product.categoryId).to.be.ok
      })
    })
  })

  describe('Class Methods on Models', () => {
    describe('Category model methods', () => {
      describe('getAllData method', () => {
        let allData
        before(() => {
          return Category.getAllData().then(data => {
            allData = data
          })
        })

        it('it returns all categories', () => {
          expect(allData.length).to.equal(2)
        })

        it('it includes the products associated to each category', () => {
          expect(allData[0].products).to.be.ok
        })
      })

      describe('createNewCategory method', () => {
        it('it adds a new instance to the Category model with a name from the Faker package', async () => {
          const newCategory = await Category.createNewCategory()
          const foundCategory = await Category.findAll({
            where: { name: newCategory.name }
          })
          const allCategories = await Category.findAndCountAll()

          expect(foundCategory.length).to.be.greaterThan(0)
          expect(allCategories.count).to.equal(3)
        })
      })

      describe('deleteCategory method', () => {
        it('it deletes a category with the given id', () => {
          return Category.deleteCategory(2)
            .then(() => Category.findByPk(2))
            .then(category => {
              expect(category).to.be.null
            })
        })
        it('it deletes all products associated to deleted category', async () => {
          const sportCategory = await Category.findOne({
            where: { name: 'sports' }
          })
          const productsInSport = await Product.findAll({
            where: { categoryId: sportCategory.id }
          })
          const productsIds = productsInSport.map(product => product.id)

          await Category.deleteCategory(sportCategory.id)
          const productsNow = await Product.findAll({
            where: { id: { [Op.in]: productsIds } }
          })
          expect(productsNow).to.eql([])
        })
      })
    })

    describe('Product model methods', () => {
      describe('createNewProduct method', () => {
        it('it creates a new product associated to the input categoryId', async () => {
          const allProductsBefore = await Product.findAndCountAll()
          const categoryOneWithProductsBefore = await Category.findByPk(1, {
            include: Product
          })
          const newProduct = await Product.createNewProduct(1)
          const newProductFound = await Product.findOne({
            where: { name: newProduct.name }
          })
          const allProductsNow = await Product.findAndCountAll()
          const categoryOneWithProductsNow = await Category.findByPk(1, {
            include: Product
          })

          expect(newProductFound).to.be.ok
          expect(allProductsNow.count).to.equal(allProductsBefore.count + 1)
          expect(categoryOneWithProductsNow.products.length).to.equal(
            categoryOneWithProductsBefore.products.length + 1
          )
        })
      })
      describe('deleteProduct method', () => {
        it('it deletes the produce with the given id', () => {
          return Product.deleteProduct(1)
            .then(() => Product.findByPk(1))
            .then(product => expect(product).to.be.null)
        })
      })
    })
  })
})
