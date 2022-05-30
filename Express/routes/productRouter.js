const express = require('express')

const { productValidator } = require('../middleware/productValidator')

const {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

const router = express.Router()

router.get('/', getAllProduct)
router.get('/:id', getProductById)

router.post('/', productValidator, createProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router