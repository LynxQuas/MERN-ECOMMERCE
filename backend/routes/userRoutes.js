const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUser);
router.get("/:userId/wishlist", userController.getUserWishlist);
router.delete("/:userId", userController.deleteUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/wishlist/add", userController.addWistlist);
router.post("/wishlist/remove", userController.removeWishlistItem);

module.exports = router;
