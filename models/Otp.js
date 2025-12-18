const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  mobilenumber: String,
  otp: String,
  expiresAt: {
    type: Date,
    default: () => Date.now() + 5 * 60 * 1000 // 5 minutes
  }
});

module.exports = mongoose.model("Otp", otpSchema);
