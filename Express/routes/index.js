const express = require('express')

const router = express.Router()
const invoice = require('./invoiceRouter')
const product = require('./productRouter')
const excel = require('./excelRouter')

router.use('/invoice', invoice)
router.use('/product', product)
router.use('/excel', excel)

module.exports = router