const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    address: {
        country: String,
        city: String,
        street: String,
    },

    profileImage: String,

    role: {
        type: String,
        required: true,
    },

    cart: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            default: [],
        },
    ],
});

module.exports = mongoose.model("User", userSchema);
