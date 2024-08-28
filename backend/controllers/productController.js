const Product = require("../models/productModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

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

const createProduct = async (req, res) => {
    const {
        name,
        price,
        imageUrl,
        category,
        onSale,
        sizes,
        colors,
        salePrice,
    } = req.body;

    if (!name || !price || !imageUrl || !category || !sizes || !colors) {
        return res
            .status(400)
            .json({ message: "Invalid request inputs need to fill." });
    }

    if (onSale && !salePrice) {
        return res.status(400).json({ message: "Sale price must be include." });
    }

    try {
        const createdProduct = new Product(req.body);
        await createdProduct.save();

        res.status(201).json({ message: "Product Created Successfully." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    if (!productId)
        return res.status(404).json({ messsage: "Product does not exist." });

    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        await Order.deleteMany({ "productId._id": productId });
        res.status(201).json({ message: "Product Deleted Successfully." });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const updateProduct = async (req, res) => {
    const { productId } = req.params;
    if (!productId)
        return res.status(404).json({ message: "Product Not Found." });

    const {
        name,
        price,
        imageUrl,
        category,
        onSale,
        sizes,
        colors,
        isFeature,
        salePrice,
    } = req.body;

    if (!name || !price || !imageUrl || !category || !sizes || !colors) {
        return res
            .status(400)
            .json({ message: "Invalid request. All fields are required." });
    }

    if (onSale && (!salePrice || salePrice >= price)) {
        return res.status(400).json({
            message: "Sale price must be less than the regular price.",
        });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                price,
                imageUrl,
                category,
                onSale,
                sizes,
                colors,
                isFeature,
                ...(onSale && { salePrice }),
            },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({
            message: "Product updated successfully.",
            updatedProduct,
        });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
};
