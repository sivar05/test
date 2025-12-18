const express = require("express");
const router = express.Router();
const forgotemailController = require("../controllers/forgotemail_controller");

router.post("/forgotemail", forgotemailController.forgotemail);

// VERIFY MOBILE NUMBER
router.post("/", forgotemailController.forgotPassword);

// CHANGE PASSWORD
router.post("/change-password", forgotemailController.changePassword);

module.exports = router;
