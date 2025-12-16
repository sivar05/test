const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  mobilenumber: String,
  password: String,
});

module.exports = mongoose.model("users", UserSchema);
