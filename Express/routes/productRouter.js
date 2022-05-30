const express = require('express')

const { getAllProduct, getProductById } = require('../controllers/productController')

const router = express.Router()

router.get('/', getAllProduct)
router.get('/:id', getProductById)

module.exports = router