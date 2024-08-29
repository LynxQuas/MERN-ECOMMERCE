const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const getOrders = async (req, res) => {
    const orders = await Order.find({});
    return res.status(200).json(orders);
};

const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    return res.status(200).json(orders);
};

const createOrder = async (req, res) => {
    console.log(req.body);
    const { userId, productId, size, color, price, quantity, imageUrl, name } =
        req.body;

    if (
        (!userId || !productId || !size || !color || !price || !imageUrl, !name)
    ) {
        return res
            .status(400)
            .json({ message: "please check the order inputs." });
    }

    const existingOrder = await Order.findOne({
        productId,
        userId,
        color,
        size,
    });

    try {
        if (existingOrder) {
            existingOrder.quantity += quantity;
            await existingOrder.save();
            return res.status(200).json({
                order: existingOrder,
                message: "Order updated successfully.",
            });
        }

        const newOrder = new Order({
            userId,
            productId,
            size,
            name,
            color,
            price,
            status: "Pending",
            quantity,
            imageUrl,
        });

        console.log(newOrder);

        await newOrder.save();

        return res
            .status(201)
            .json({ order: newOrder, message: "Order created successfully." });
    } catch (err) {
        console.error("Error creating order:", err);
        return res.status(500).json({
            message: "Something went wrong while creating the order.",
        });
    }
};

const deleteCartItem = async (req, res) => {
    const { userId } = req.body;
    const { productId } = req.params;

    if (!userId || !productId) {
        return res
            .status(400)
            .json({ message: "User ID and product ID are required." });
    }

    try {
        const result = await Order.findOneAndDelete({ userId, productId });
        if (!result) {
            return res.status(404).json({ message: "Cart item not found." });
        }
        res.status(201).json({ message: "Cart Item removed successfully." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const updateOrderQuantity = async (req, res) => {
    const { userId, productId, quantity, size, color } = req.body;
    if (!userId || !productId || quantity === undefined || !size || !color) {
        return res.status(400).json({
            message: "User ID, product ID, and quantity are required.",
        });
    }

    try {
        const order = await Order.findOne({ userId, productId, color, size });

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        order.quantity = quantity;
        await order.save();

        return res.status(200).json({
            order,
            message: "Order quantity updated successfully.",
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong while updating the order quantity.",
        });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrdersByUserId,
    deleteCartItem,
    updateOrderQuantity,
};
