const User = require("../models/User");

// SIGNUP
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
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const { email, mobilenumber, password } = req.body;

  await User.updateOne(
    { email },
    { $set: { mobilenumber, password } }
  );

  res.json({ message: "User updated successfully" });
};

// SIGNIN - FIXED VERSION
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body; 
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    // Check password - Assuming you have password hashing
    // If you're storing plain passwords (not recommended):
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    // Return user without password
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    delete userWithoutPassword.__v;
    
    res.json({ 
      success: true, 
      message: "Login successful",
      user: userWithoutPassword
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}; // ✅ End of function - no extra code after this!