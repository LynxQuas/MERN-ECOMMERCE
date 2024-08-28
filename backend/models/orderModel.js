const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
    },

    imageUrl: {
        type: String,
        required: true,
    },

    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },

    status: {
        type: String,
        enum: ["Pending", "Paid", "Processing", "Completed"],
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);
