const bcrypt = require("bcrypt");

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  console.log("TOKEN RECEIVED:", token);
console.log("TOKEN IN DB:", user?.resetToken);
console.log("EXPIRY:", user?.resetTokenExpiry);
console.log("NOW:", Date.now());


  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return res.json({ success: false, message: "Invalid or expired link" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  res.json({ success: true, message: "Password reset successful" });
};
