const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/password_controller");

router.post("/changepassword", passwordController.changePassword);

module.exports = router;
