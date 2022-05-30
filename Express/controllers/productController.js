const { Invoice, Product } = require('../models')

class ProductController {
    async getAllProduct(req, res) {
        try {
            const dataProduct = await Product.findAndCountAll({
                attributes: {
                    exclude: ["createdAt", "deletedAt", "updatedAt"],
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
                    exclude: ["createdAt", "deletedAt", "updatedAt"],
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
}

module.exports = new ProductController()