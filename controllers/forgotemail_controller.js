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
    const localPart = email.slice(0, atIndex); // before @
    const domain = email.slice(atIndex);       // @exp.in

    const firstPart = localPart.slice(0, 3);   // first 3 chars
    const lastPart = localPart.slice(-2);      // last 2 chars

    const maskLength = localPart.length - (3 + 2);
    const maskedEmail = firstPart +  "*".repeat(maskLength) +  lastPart +  domain;
 
    res.json({ success: true, maskedEmail });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

