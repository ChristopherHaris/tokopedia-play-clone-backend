const express = require("express");
const {
  addProduct,
  getProductList,
  deleteProduct,
} = require("../controller/product.controller.js");
const verifyToken = require("../verifyToken.js");

const router = express.Router();

router.post("/", verifyToken, addProduct);
router.get("/:videoId", getProductList);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
