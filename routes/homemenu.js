const express = require("express");
const router = express.Router();
const Menu = require("../models/homemenu");

router.get("/menu", async (req, res) => {
  const menu = await Menu.find();
  res.json(menu);
});

router.post("/api/home_menus", async (req, res) => {
  const newItem = new Menu(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

module.exports = router;
