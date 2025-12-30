const mongoose = require("mongoose");

const wildImageSchema = new mongoose.Schema({
  name: String,
  image: String,   // image path or URL
  action: String
});
module.exports = mongoose.model("WildImage", wildImageSchema, "wildimages");
