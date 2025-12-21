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
 
});
const user = await User.findOne({
  resetToken: token,
  resetTokenExpiry: { $gt: Date.now() }
});

if (!user) {
  return res.status(400).json({
    message: "Invalid or expired token"
  });
}


module.exports = mongoose.model("User", userSchema);
