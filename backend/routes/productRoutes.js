const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProduct);
router.post("/", productController.createProduct);
router.delete("/:productId", productController.deleteProduct);
router.put("/:productId", productController.updateProduct);

module.exports = router;
