const express = require("express");
const router = express.Router();
const controller = require("../controllers/forgotemail_controller");

// recover email
router.post("/recover-email", controller.recoverEmail);

module.exports = router;
