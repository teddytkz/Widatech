const express = require('express')

const { productValidator } = require('../middleware/productValidator')

const {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct
} = require('../controllers/productController')

const router = express.Router()

router.get('/', getAllProduct)
router.get('/:id', getProductById)

router.post('/', productValidator, createProduct)

router.put('/:id', updateProduct)

module.exports = router