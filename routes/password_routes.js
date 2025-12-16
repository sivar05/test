const express = require("express");
const router = express.Router();
const controller = require("../controllers/password_controller");

router.post("/change-password", controller.changePassword);

module.exports = router;
