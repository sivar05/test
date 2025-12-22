const express = require("express");
const router = express.Router();

const {
  sendResetLink,
  resetPassword
} = require("../controllers/forgotpassword_controller");

// Make sure these match what your frontend is calling
router.post("/", sendResetLink);  // This handles POST /api/forgotpassword
router.post("/resetpassword", resetPassword);  // This handles POST /api/forgotpassword/resetpassword

module.exports = router;