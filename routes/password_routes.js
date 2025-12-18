const express = require("express");
const router = express.Router();
const controller = require("../controllers/password_controller");

router.post("/changepassword", controller.changePassword);

module.exports = router;
