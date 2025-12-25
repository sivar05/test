const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* ======================
   SIGNUP
====================== */
exports.signup = async (req, res) => {
  try {
    const { username, email, mobilenumber, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (await User.findOne({ username })) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (await User.findOne({ mobilenumber })) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    const user = new User({ username, email, mobilenumber, password });
    await user.save();

    res.json({ success: true, message: "Signup successful" });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
   SIGNIN (FIXED)
====================== */
exports.signin = async (req, res) => {
  try {
    console.log("BODY:", req.body); // ✅ correct place

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    console.log("USER FOUND:", !!user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    delete userWithoutPassword.__v;

    res.json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword
    });

  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
