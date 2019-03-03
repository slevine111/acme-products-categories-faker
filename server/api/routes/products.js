const express = require('express')
const router = express.Router()
const { Product } = require('../../DataAccess/models/index')

module.exports = router

router.delete('/:id', (req, res, next) => {
  Product.deleteProduct(Number(req.params.id))
    .then(() => res.sendStatus(204))
    .catch(next)
})
