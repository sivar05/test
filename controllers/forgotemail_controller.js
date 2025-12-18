const User = require("../models/User");

// RECOVER EMAIL USING MOBILE
exports.recoverEmail = async (req, res) => {
  try {
    const { mobilenumber } = req.body;

    console.log("📞 Mobile received from frontend:", mobilenumber);

    const users = await User.find({});
    console.log("📦 All users in DB:", users);

    const user = await User.findOne({
      mobilenumber: String(mobilenumber)
    });

    console.log("👤 Matched user:", user);

    if (!user) {
      return res.status(404).json({ message: "Mobile number not registered" });
    }

    const email = user.email;
    const atIndex = email.indexOf("@");
    const maskedEmail =
      email[0] +
      "*".repeat(atIndex - 2) +
      email.slice(atIndex - 1);

    res.json({ success: true, maskedEmail });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

