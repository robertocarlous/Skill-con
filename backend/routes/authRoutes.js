const express = require("express");
const router = express.Router();
const authController = require("../controller/authcontroller");

// Auth routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/set-role", authController.setRole);
router.post("/logout", authController.logout);

module.exports = router;
