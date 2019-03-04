const { expect } = require('chai')
const app = require('supertest')(require('../server/api/index'))
const syncAndSeed = require('../server/DataAccess/seed')
const { Category, Product } = require('../server/DataAccess/models/index')

beforeEach(() => {
  return syncAndSeed()
})

describe('My Routes', () => {
  describe('GET / route', () => {
    it('it returns a resposne with Content-Type equal to text/html', done => {
      app
        .get('/')
        .expect(200)
        .expect('content-type', /text\/html/, done)
    })
  })

  describe('GET /api/categories route', () => {
    it('it returns a JSON object', done => {
      app
        .get('/api/categories')
        .expect(200)
        .expect('content-type', /application\/json/, done)
    })
    it('it return all categories in the database', done => {
      app
        .get('/api/categories')
        .expect(200)
        .end((err, response) => {
          if (err) return done(err)
          expect(response.body.length).to.equal(2)
          return done()
        })
    })
    it('it returns the products associated to each category', done => {
      app
        .get('/api/categories')
        .expect(200)
        .end((err, response) => {
          if (err) return done(err)
          expect(response.body[0].products).to.be.ok
          return done()
        })
    })
  })
  describe('POST /api/categories route', () => {
    it('it returns a JSON object', done => {
      app
        .post('/api/categories')
        .expect(200)
        .expect('content-type', /application\/json/, done)
    })
    it('it returns the new category created and adds the category to the database', done => {
      app
        .post('/api/categories')
        .then(response => {
          return Category.findByPk(Number(response.body.id))
        })
        .then(categoryFound => {
          expect(categoryFound).to.be.ok
          done()
        })
        .catch(err => done(err))
    })
  })
  describe('DELETE /api/categories/:id route', () => {
    it('it returns a 204 status code', done => {
      app.delete('/api/categories/1').expect(204, done)
    })
    it('it returns an empty object', done => {
      app.delete('/api/categories/1').end((err, response) => {
        if (err) return done(err)
        expect(response.data).to.be.undefined
        return done()
      })
    })
    it('it deletes the category with the given id in the database', done => {
      app
        .delete('/api/categories/1')
        .then(() => Category.findByPk(1))
        .then(categoryFound => {
          expect(categoryFound).to.be.null
          return done()
        })
        .catch(err => done(err))
    })
  })
  describe('POST /api/categories/:id/products route', () => {
    it('it returns a JSON object', done => {
      app
        .post('/api/categories/1/products')
        .expect(200)
        .expect('content-type', /application\/json/, done)
    })
    it('it returns the new product created and adds the category to the database ssociated to the given categoryId', done => {
      app
        .post('/api/categories/1/products')
        .then(response => {
          return Promise.all([
            response.body,
            Category.findByPk(1, { include: Product })
          ])
        })
        .then(([newProduct, categoryOneData]) => {
          const productFound = categoryOneData.products.find(
            product => product.name === newProduct.name
          )
          expect(productFound).to.be.ok
          done()
        })
        .catch(err => done(err))
    })
  })
  describe('DELETE /api/categories/products/:id route', () => {
    it('it returns a 204 status code', done => {
      app.delete('/api/categories/products/1').expect(204, done)
    })
    it('it returns an empty object', done => {
      app.delete('/api/categories/products/1').end((err, response) => {
        if (err) return done(err)
        expect(response.data).to.be.undefined
        return done()
      })
    })
    it('it deletes the product with the given id in the database', done => {
      app
        .delete('/api/categories/products/1')
        .then(() => Product.findByPk(1))
        .then(productFound => {
          expect(productFound).to.be.null
          return done()
        })
        .catch(err => done(err))
    })
  })

  /* it('check supertest wiring', () => {
    app.get('/api/categories').
    expect(200)
  })*/
})
