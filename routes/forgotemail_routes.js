const express = require("express");
const router = express.Router();
const forgotemailController = require("../controllers/forgotemail_controller");

router.post("/forgotemail", forgotemailController.forgotemail);

module.exports = router;
