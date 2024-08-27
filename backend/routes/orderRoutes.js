const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.get("/:userId", orderController.getOrdersByUserId);
router.delete("/:productId", orderController.deleteCartItem);
router.patch("/update-quantity", orderController.updateOrderQuantity);

module.exports = router;
