const User = require("../models/User");
const crypto = require("crypto");
const transporter = require("../utils/transporter");

/* ---------- SEND RESET LINK ---------- */
exports.sendResetLink = async (req, res) => {
  try {
  const email = req.body.email;
console.log("📩 Input email:", JSON.stringify(email));

const users = await User.find({});
console.log("👥 Total users:", users.length);
console.log("📂 DB emails:", users.map(u => JSON.stringify(u.email)));
const user = await User.findOne({ email });


    if (!user) {
      return res.json({ success: false, message: "Email not registered" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink =
  `${process.env.FRONTEND_URL}/test/resetpassword/resetpassword.html?token=${token}`;


    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `
        <p>Click below to reset your password</p>
        <a href="${resetLink}">${resetLink}</a>
      `
    });

    res.json({ success: true, message: "Reset link sent" });

  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Failed to send reset link" });
  }
};



/* ---------- RESET PASSWORD ---------- */
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return res.json({ success: false, message: "Invalid or expired link" });
  }

  user.password = newPassword; // (bcrypt already handled elsewhere)
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  res.json({ success: true, message: "Password reset successful" });
};
