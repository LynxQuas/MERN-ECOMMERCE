const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    imageUrl: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    colors: [{ type: String, required: true }],

    category: {
        type: String,
        enum: [
            "all",
            "men",
            "women",
            "footwear",
            "accessories",
            "sale",
            "new-arrivals",
            "best-sellers",
        ],
        required: true,
    },

    sizes: {
        type: [String],
        required: true,
    },

    onSale: {
        type: Boolean,
        default: false,
    },

    salePrice: {
        type: Number,
        default: 0,
    },

    isFeature: {
        type: Boolean,
        default: false,
    },

    ratings: {
        type: Number,
        default: 0,
    },

    dateAdded: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);
