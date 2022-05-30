const fs = require('fs')
const { Invoice, Product } = require('../models')
const readXlsxFile = require('read-excel-file/node')
const invoice = require('../models/invoice')

const excelUpload = async (req, res) => {
    try {
        if (req.files == null) {
            res.status(400).json({ success: false, message: 'File Not Found' })
        }
        let messages = []
        let error = []
        const invoiceSheet = readXlsxFile(req.files.file.tempFilePath, { sheet: 1 }).then((rows) => {
            rows.shift()
            let invoiceArray = []
            rows.forEach((row) => {
                let invoiceData = {
                    invoiceNo: row[0],
                    date: row[1],
                    customerName: row[2],
                    salesPersonName: row[3],
                    paymentType: row[4],
                    notes: row[5]
                }
                invoiceArray.push(invoiceData)
            })
            Invoice
                .bulkCreate(invoiceArray)
                .then((result) => {
                    console.log(result)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(400).json({
                        message: "Failed Import Data From Excel",
                        error: error.message
                    })
                })
        })

        const productSheet = readXlsxFile(req.files.file.tempFilePath, { sheet: 2 }).then((rows) => {
            rows.shift()
            let productArray = []
            rows.forEach((row) => {
                let productData = {
                    invoiceNo: row[0],
                    itemName: row[1],
                    quantity: row[2],
                    totalCogs: row[3],
                    totalPriceSold: row[4]
                }
                productArray.push(productData)
            })
            Product
                .bulkCreate(productArray)
                .then((result) => {
                    console.log(result)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(400).json({
                        message: "Failed Import Data From Excel",
                        error: error.message
                    })
                })
        })
        res.status(200).json({ message: "Success Import Data From Excel" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error })
    }
}

module.exports = { excelUpload }