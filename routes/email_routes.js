const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/email_controller");

router.post("/forgot", passwordController.forgotemail);

module.exports = router;
