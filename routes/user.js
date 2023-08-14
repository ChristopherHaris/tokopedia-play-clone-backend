const express = require("express");
const {
  updateUser,
  getUser,
  deleteUser,
} = require("../controller/user.controller");
const verifyToken = require("../verifyToken.js");

const router = express.Router();

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);

module.exports = router;