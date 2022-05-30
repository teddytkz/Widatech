const express = require('express')

const router = express.Router()
const invoice = require('./invoiceRouter')

router.use('/invoice', invoice)

module.exports = router