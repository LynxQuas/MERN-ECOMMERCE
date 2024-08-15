const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProduct);

module.exports = router;
