const { Invoice, Product } = require('../models')

class ProductController {
    async getAllProduct(req, res) {
        try {
            const dataProduct = await Product.findAndCountAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            })
            const price = await Product.sum('totalPriceSold')
            const cogs = await Product.sum('totalCogs')
            const profit = price - cogs
            if (dataProduct == null) {
                return res.status(404).json({ success: false, message: "Product Not Found" })
            }
            res.status(200).json({ dataProduct, totalProfit: profit })
        } catch (error) {
            console.log(error)
            res.status(400).json({ success: false, message: "Bad request" })
        }
    }

    async getProductById(req, res) {
        try {
            const dataProduct = await Product.findOne({
                where: {
                    id: req.params.id
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            })
            const price = dataProduct.totalPriceSold
            const cogs = dataProduct.totalCogs
            const profit = price - cogs
            if (dataProduct == null) {
                return res.status(404).json({ success: false, message: "Product Not Found" })
            }
            res.status(200).json({ dataProduct, totalProfit: profit })
        } catch (error) {
            console.log(error)
            res.status(400).json({ success: false, message: "Bad request" })
        }
    }

    async createProduct(req, res, next) {
        try {
            const { invoiceNo, itemName, quantity, totalCogs, totalPriceSold } = req.body
            const addProduct = await Product.create({
                invoiceNo: invoiceNo,
                itemName: itemName,
                quantity: quantity,
                totalCogs: totalCogs,
                totalPriceSold: totalPriceSold
            })
            const dataProduct = await Product.findOne({
                where: {
                    id: addProduct.id
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            })
            res.status(200).json({ dataProduct, message: 'Success Add Product' })
        } catch (error) {
            console.log(error);
            next(error)
            res.status(400).json({ success: false, message: error });
        }
    }

    async updateProduct(req, res) {
        try {
            const updateProduct = await Product.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            const productData = await Product.findOne({
                where: {
                    id: req.params.id
                }, attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            })
            res.status(200).json({ productData, message: "Success Update Product" })
        } catch (error) {
            console.log(error);
            res.status(400).json({ success: false, message: error });
        }
    }
}

module.exports = new ProductController()