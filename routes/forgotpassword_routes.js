const express = require("express");
const router = express.Router();

const {  resetPassword} = require("../controllers/forgotpassword_controller");
const { sendResetLink } = require("../controllers/forgotpassword_controller");


router.post("/send-reset-link", (req, res, next) => {
  console.log("✅ /api/send-reset-link HIT");
  next();
}, sendResetLink);

router.post("/reset-password", resetPassword);

module.exports = router;
