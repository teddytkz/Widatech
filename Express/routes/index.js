const express = require('express')

const router = express.Router()
const invoice = require('./invoiceRouter')
const product = require('./productRouter')

router.use('/invoice', invoice)
router.use('/product', product)

module.exports = router