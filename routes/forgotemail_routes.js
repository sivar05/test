const express = require("express");
const router = express.Router();
const forgotemailController = require("../controllers/forgotemail_controller");

// VERIFY MOBILE NUMBER
router.post("/", forgotemailController.forgotPassword);

// CHANGE PASSWORD
router.post("/changepassword", forgotemailController.changePassword);

module.exports = router;
