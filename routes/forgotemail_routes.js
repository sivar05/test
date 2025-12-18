const express = require("express");
const router = express.Router();

// ✅ IMPORT CONTROLLER PROPERLY
const forgotemailController = require("../controllers/forgotemail_controller");

// SEND OTP
router.post("/send-otp", forgotemailController.sendOTP);

// RESEND OTP
router.post("/resend-otp", forgotemailController.sendOTP);

// VERIFY OTP
router.post("/verify-otp", forgotemailController.verifyOTP);

// RECOVER EMAIL AFTER OTP
router.post("/recover-email", forgotemailController.recoverEmail);

module.exports = router;
