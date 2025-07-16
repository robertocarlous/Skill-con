const express = require("express");
const router = express.Router();
const authController = require("../controller/authcontroller");

// Auth routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/verify-otp", authController.verifyOtp);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/set-role", authController.setRole);

module.exports = router;
