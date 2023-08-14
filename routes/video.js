const express = require("express");
const {
  addVideo,
  getAllVideo,
  getVideo,
  search,
  deleteVideo,
} = require("../controller/video.controller.js");
const verifyToken = require("../verifyToken.js");

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.get("/", getAllVideo);
router.get("/search", search);
router.get("/:videoId", getVideo);
router.delete("/:videoId", verifyToken, deleteVideo);

module.exports = router;
