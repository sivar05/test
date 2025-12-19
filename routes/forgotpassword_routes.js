const express = require("express");
const router = express.Router();

const {
  sendResetLink,
  resetPassword
} = require("../controllers/forgotpassword_controller");

router.post("/send-reset-link", sendResetLink);
router.post("/reset-password", resetPassword);

module.exports = router;
