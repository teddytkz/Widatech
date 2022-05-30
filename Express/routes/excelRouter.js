const express = require('express')
const router = express.Router()

const excelController = require('../controllers/excelController')

router.post('/', excelController.excelUpload)

module.exports = router