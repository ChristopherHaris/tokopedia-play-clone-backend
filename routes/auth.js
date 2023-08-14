const express = require("express");
const {
  googleAuth,
  signIn,
  signUp,
} = require("../controller/auth.controller.js");

const router = express.Router();

//CREATE A USER
router.post("/signup", signUp);

//SIGN IN
router.post("/signin", signIn);

//GOOGLE AUTH
router.post("/google", googleAuth);

module.exports = router;
