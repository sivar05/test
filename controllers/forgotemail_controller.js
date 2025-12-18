const User = require("../models/User");

// VERIFY MOBILE NUMBER
exports.forgotPassword = async (req, res) => {
  try {
    const { mobilenumber } = req.body;

    const user = await User.findOne({ mobilenumber });
    if (!user) {
      return res.status(404).json({
        message: "Mobile number not registered"
      });
    }

    res.json({
      success: true,
      message: "Mobile verified. You can reset your password."
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  const { mobilenumber, newPassword } = req.body;

  await User.updateOne(
    { mobilenumber },
    { $set: { password: newPassword } }
  );

  res.json({ message: "Password updated successfully" });
};
