const express = require("express");
const router = express.Router();

const {
  sendResetLink,
  resetPassword
} = require("../controllers/forgotpassword_controller");

router.post("/send-reset-link", sendResetLink);
router.post("/resetpassword", resetPassword);

module.exports = router;
