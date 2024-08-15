const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
};

const getProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({
            message: "Failed to get Product please try again.",
        });
    }
};

module.exports = {
    getAllProducts,
    getProduct,
};
