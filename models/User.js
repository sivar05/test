const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'Email is required']
  },
  mobilenumber: {
    type: String,
    required: [true, 'Mobile number is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  resetToken: String,  // For password reset tokens
  resetTokenExpiry: Date  // ✅ CORRECT: Just store the expiry date as a Date type
});

const User = mongoose.model('User', userSchema);
module.exports = User;