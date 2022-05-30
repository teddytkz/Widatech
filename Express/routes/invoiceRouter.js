const express = require('express')

const { invoiceValidator } = require('../middleware/invoiceValidator')

const {
    getAllInvoice,
    getInvoiceId,
    getAllInvoiceByDate,
    createInvoice,
    updateInvoice,
    deleteInvoice
} = require('../controllers/invoiceController')

const router = express.Router()

router.get('/', getAllInvoice)
router.get('/:id', getInvoiceId)
router.get('/date/:date', getAllInvoiceByDate)

router.post('/', invoiceValidator, createInvoice)

router.put("/:id", updateInvoice);

router.delete('/:id', deleteInvoice)

module.exports = router