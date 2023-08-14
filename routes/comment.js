const express = require("express");
const {
  addComment,
  deleteComment,
  getComment,
} = require("../controller/comment.controller.js");
const verifyToken = require("../verifyToken.js");
const router = express.Router();

router.post("/", verifyToken, addComment);
router.get("/:videoId", getComment);
router.delete("/:id", verifyToken, deleteComment);


module.exports = router;
