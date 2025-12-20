const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  mobilenumber: String,
  password: String,
  resetToken: String,
  resetTokenExpiry: Date,
});


module.exports = mongoose.model("User", userSchema);
