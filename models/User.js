const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  mobilenumber: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);
