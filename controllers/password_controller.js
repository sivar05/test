const User = require("../models/User");

exports.changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== oldPassword) {
    return res.status(400).json({ message: "Old password incorrect" });
  }

  user.password = newPassword;
  await user.save();

  res.json({ success: true, message: "Password updated successfully" });
};
