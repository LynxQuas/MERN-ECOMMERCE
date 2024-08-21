const Product = require("../models/productModel");
const User = require("../models/userModel");

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

    console.log(req.body);

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
        res.status(500).json({ message: "Something went wrong." });
    }
};

const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    if (!productId)
        return res.status(404).json({ messsage: "Product does not exist." });

    try {
        await Product.findByIdAndDelete(productId);
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
        salePrice,
    } = req.body;

    console.log(req.body);

    // Validate required fields
    if (!name || !price || !imageUrl || !category || !sizes || !colors) {
        return res
            .status(400)
            .json({ message: "Invalid request. All fields are required." });
    }

    // Validate sale price if onSale is true
    if (onSale && (!salePrice || salePrice >= price)) {
        return res.status(400).json({
            message: "Sale price must be less than the regular price.",
        });
    }

    try {
        // Update product
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
                ...(onSale && { salePrice }), // Only include salePrice if onSale is true
            },
            { new: true, runValidators: true } // Return the updated document
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
