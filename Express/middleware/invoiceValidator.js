const path = require('path')
const validator = require('validator')
const yup = require('yup')
const { Invoice } = require('../models')

exports.invoiceValidator = async (req, res, next) => {
    try {
        const errors = []
        const invoiceSchema = yup.object().shape({
            invoiceNo: yup.string().min(1).required(),
            date: yup.date().required(),
            customerName: yup.string().min(2).required(),
            salesPersonName: yup.string().min(2).required(),
            paymentType: yup.mixed().oneOf(["CASH", "CREADDIT"]),
            notes: yup.string().min(5).notRequired()
        })

        const checkInvoiceNo = await Invoice.findOne({
            where: {
                invoiceNo: req.body.invoiceNo
            }
        })

        if (checkInvoiceNo != null) {
            errors.push("Already Have same Invoice Number")
        }

        await invoiceSchema.validate(req.body, { abortEarly: false })

        if (errors.length > 0) {
            res.status(400).json({ message: errors })
        }
        next()
    } catch (error) {
        console.log(error, "Validation Error")
        res.status(400).json({ error: "Validation Error", messsage: error.inner })
    }
}