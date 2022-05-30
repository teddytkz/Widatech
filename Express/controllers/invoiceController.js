const { date } = require('yup')
const { Invoice, Product, sequelize } = require('../models')
const { Op } = require('sequelize')
const invoice = require('../models/invoice')

class InvoiceController {
    async getAllInvoice(req, res) {
        try {
            const pagination = (page, size) => {
                const limit = size ? +size : 6
                const offset = ((page - 1) * limit) | 0
                return { limit, offset }
            }
            const { page, size } = req.query
            const { limit, offset } = pagination(page, size)
            const data = await Invoice.findAndCountAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [
                    {
                        model: Product,
                        attributes: ["itemName", "totalCogs", "totalPriceSold"],
                    }
                ],
                offset
            })

            let sumCash = 0
            let sumCogs = 0
            let sumPrice = 0
            let sumProfit = 0

            data.rows.forEach((result, i) => {
                if (result.paymentType == "CASH") {
                    result.Products.forEach((results) => {
                        sumCash += results.totalPriceSold
                    })
                }
            })

            data.rows.forEach((result) => {
                result.Products.forEach((results) => {
                    sumCogs += results.totalCogs
                    sumPrice += results.totalPriceSold
                })
            })

            sumProfit = sumPrice - sumCogs

            const paging = (data, page, limit) => {
                const { count: totalItems, rows: Invoice } = data;
                const currentPage = page ? +page : 1;
                const totalPages = Math.ceil(totalItems / limit);
                return {
                    totalItems,
                    Invoice,
                    totalPages,
                    currentPage,
                    sumProfit,
                    sumCash,
                };
            }
            if (data == null) {
                return res
                    .status(404)
                    .json({ success: false, errors: ["Invoice not found"] });
            } else {
                res.status(200).json(paging(data, page, limit))
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error })
        }
    }

    async getInvoiceId(req, res) {
        try {
            const data = await Invoice.findAll({
                where: {
                    invoiceNo: req.params.id
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [
                    {
                        model: Product,
                        attributes: ["itemName", "totalCogs", "totalPriceSold"],
                    }
                ],
            })

            let cogs = 0
            let total = 0
            data.forEach((result) => {
                result.Products.forEach((results) => {
                    cogs += results.totalCogs
                    total += results.totalPriceSold
                })
            })

            let profit = total - cogs
            if (data.length == 0) {
                res.status(404).json({ messsage: ["Invoice Not Found"] })
            } else {
                res.status(200).json({ data, profit })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error })
        }
    }

    async getAllInvoiceByDate(req, res) {
        try {
            const pagination = (page, size) => {
                const limit = size ? +size : 6
                const offset = ((page - 1) * limit) | 0
                return { limit, offset }
            }
            const { page, size, dateSum } = req.query
            const { limit, offset } = pagination(page, size)
            const filterDate = dateSum ? { [Op.iLike]: `${dateSum}` } : { [Op.ne]: null }
            const data = await Invoice.findAndCountAll({
                where: {
                    date: req.params.date
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [
                    {
                        model: Product,
                        attributes: ["itemName", "totalCogs", "totalPriceSold"],
                    }
                ],
                offset
            })

            let sumCash = 0
            let sumCogs = 0
            let sumPrice = 0
            let sumProfit = 0

            data.rows.forEach((result, i) => {
                if (result.paymentType == "CASH") {
                    result.Products.forEach((results) => {
                        sumCash += results.totalPriceSold
                    })
                }
            })

            data.rows.forEach((result) => {
                result.Products.forEach((results) => {
                    sumCogs += results.totalCogs
                    sumPrice += results.totalPriceSold
                })
            })

            sumProfit = sumPrice - sumCogs

            const paging = (data, page, limit) => {
                const { count: totalItems, rows: Invoice } = data;
                const currentPage = page ? +page : 1;
                const totalPages = Math.ceil(totalItems / limit);
                return {
                    totalItems,
                    Invoice,
                    totalPages,
                    currentPage,
                    sumProfit,
                    sumCash,
                };
            }
            if (data == null || data.count == 0) {
                return res
                    .status(404)
                    .json({ success: false, errors: ["Invoice not found"] });
            } else {
                res.status(200).json(paging(data, page, limit))
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error })
        }
    }

    async createInvoice(req, res, next) {
        try {

            const { invoiceNo, date, customerName, salesPersonName, paymentType, notes } = req.body
            const insertInvoice = await Invoice.create({
                invoiceNo: invoiceNo,
                date: date,
                customerName: customerName,
                salesPersonName: salesPersonName,
                paymentType: paymentType,
                notes: notes
            })
            const data = await Invoice.findOne({
                where: { id: insertInvoice.id },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            });

            res.status(201).json({ data, message: "Succes Add Invoice" });
        } catch (error) {
            console.log(error);
            next(error)
            res.status(400).json({ message: error });
        }
    }

    async updateInvoice(req, res, next) {
        try {
            const invoiceData = await Invoice.findOne({
                where: {
                    id: req.params.id
                }
            })
            const updateData = await Invoice.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            const data = await Invoice.findOne({
                where: { id: req.params.id },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            });
            res.status(200).json({ data, message: "Succes Update Invoice" });
        } catch (error) {
            console.log(error);
            next(error)
            res.status(400).json({ message: error });
        }
    }

    async deleteInvoice(req, res) {
        try {
            const dataInvoice = await Invoice.findOne({
                where: {
                    id: req.params.id
                }
            })
            let data = await Invoice.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (!data) {
                return res.status(404).json({ message: ["Invoice not found"] });
            }
            res.status(200).json({ message: ["Success delete your Invoice"] });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: ["Internal Server Error"] });
        }
    }
}
module.exports = new InvoiceController()