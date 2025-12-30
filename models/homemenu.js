const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: String,
  icon: String,
  action: String
});

module.exports = mongoose.model("homemenu", menuSchema, "home_menus");
