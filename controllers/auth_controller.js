const User = require("../models/User");

// SIGNUP CONTROLLER
exports.signup = async (req, res) => {
  const { username, email, mobilenumber, password, confirmPassword } = req.body;

  // 1️⃣ password match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // 2️⃣ duplicate email
  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // 3️⃣ duplicate username
  if (await User.findOne({ username })) {
    return res.status(400).json({ message: "Name already exists" });
  }

  // 4️⃣ duplicate mobile
  if (await User.findOne({ mobilenumber })) {
    return res.status(400).json({ message: "Mobile number already exists" });
  }

  const user = new User({
    username,
    email,
    mobilenumber,
    password,
  });

  await user.save();

  res.json({ success: true, message: "Signup successful" });
};

// UPDATE USER CONTROLLER
exports.updateUser = async (req, res) => {
  const { email, mobilenumber, password } = req.body;

  await User.updateOne(
    { email },
    { $set: { mobilenumber, password } }
  );

  res.json({ message: "User updated successfully" });
};
