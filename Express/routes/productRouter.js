const express = require('express')

const { productValidator } = require('../middleware/productValidator')

const { getAllProduct, getProductById, createProduct } = require('../controllers/productController')

const router = express.Router()

router.get('/', getAllProduct)
router.get('/:id', getProductById)

router.post('/', productValidator, createProduct)

module.exports = router