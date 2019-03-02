const { expect } = require('chai')
const syncAndSeed = require('../server/DataAccess/index')
const { Product, Category } = require('../server/DataAccess/models/index')

beforeEach(() => {
  return syncAndSeed()
})

describe('Models in Database', () => {
  describe('The Category model', () => {
    it('it has name field', () => {
      Category.create({ name: 'test' }).then(category => {
        expect(category.name).to.be.ok
        expect(category.name).to.equal('test')
      })
    })
    it('name field is required', () => {
      let error
      Category.create()
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
      Category.create({ name: '' })
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
      Product.create({ name: 'product' }).then(product => {
        expect(product.name).to.be.ok
        expect(product.name).to.equal('product')
      })
    })
    it('name field is required', () => {
      let error
      Product.create()
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
      Product.create({ name: '' })
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
      Product.findOne({ where: { name: 'sql' } }).then(product => {
        expect(product.categoryId).to.be.ok
      })
    })
  })
})
