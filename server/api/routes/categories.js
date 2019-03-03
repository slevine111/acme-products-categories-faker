const express = require('express')
const router = express.Router()
const { Category } = require('../../DataAccess/models/index')

router.get('/', (req, res, next) => {
  Category.getAllData()
    .then(data => res.json(data))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Category.createNewCategory()
    .then(category => res.json(category))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Category.deleteCategory(Number(req.params.id))
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
