const path = require('path')
const validator = require('validator')
const yup = require('yup')

exports.productValidator = async (req, res, next) => {
    try {
        const errors = []
        const productSchema = yup.object().shape({
            invoiceNo: yup.number().min(1).required(),
            itemName: yup.string().min(5).required(),
            quantity: yup.number().min(1).required(),
            totalCogs: yup.number().min(0).required(),
            totalPriceSold: yup.number().mi0(1).required()
        })

        await productSchema.validate(req.body, { abortEarly: false })

        if (errors.length > 0) {
            res.status(400).json({ message: errors })
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: "Bad request" })
    }
}