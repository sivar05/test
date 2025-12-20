const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

/* ---------- MAIL ---------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ---------- SEND RESET LINK ---------- */
exports.sendResetLink = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Email not registered" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    // 👇 ONLY link generation here
    const resetLink =
      `https://sivar05.github.io/test/resetpassword/resetpassword.html?token=${token}`;

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

  user.password = newPassword; // ⚠️ hash later
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  res.json({ success: true, message: "Password reset successful" });
};
