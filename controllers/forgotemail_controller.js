const User = require("../models/User");
const axios = require("axios");
const nodemailer = require("nodemailer");

const otpStore = new Map();

exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore.set(email, {
    otp,
    expires: Date.now() + 5 * 60 * 1000
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: "No Reply <noreply@app.com>",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. Valid for 5 minutes.`
  });

  res.json({ message: "OTP sent to email" });
};


exports.sendOTP = async (req, res) => {
  console.log("FAST2SMS KEY:", process.env.FAST2SMS_API_KEY);

  try {
    const { mobilenumber } = req.body;

    if (!mobilenumber) {
      return res.status(400).json({ message: "Mobile number required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const response = await axios({
      method: "POST",
      url: "https://www.fast2sms.com/dev/bulkV2",
      headers: {
        authorization: process.env.FAST2SMS_API_KEY,
        "Content-Type": "application/json"
      },
      data: {
        route: "otp",
        variables_values: otp,
        numbers: mobilenumber
      }
    });

    console.log("FAST2SMS RESPONSE:", response.data);

    if (!response.data.return) {
      return res.status(500).json({
        message: response.data.message || "OTP sending failed"
      });
    }

    res.json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("FAST2SMS ERROR:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { mobilenumber, otp } = req.body;

  if (global.otpStore?.[mobilenumber] != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const user = await User.findOne({ mobilenumber });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  delete global.otpStore[mobilenumber];

  const email = user.email;
  const at = email.indexOf("@");
  const masked =
    email[0] + "*".repeat(at - 2) + email.slice(at - 1);

  res.json({
    success: true,
    maskedEmail: masked
  });
};

// RECOVER EMAIL AFTER OTP VERIFIED
exports.recoverEmail = async (req, res) => {
  try {
    const { mobilenumber } = req.body;

    if (!mobilenumber) {
      return res.status(400).json({
        success: false,
        message: "Mobile number required"
      });
    }

    const user = await User.findOne({ mobilenumber });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Mobile number not registered"
      });
    }

    if (!user.email || !user.email.includes("@")) {
      return res.status(500).json({
        success: false,
        message: "Invalid email stored"
      });
    }

    const [name, domain] = user.email.split("@");

    const visibleStart = 4; // first 4 characters visible
    const visibleEnd = 2;   // last 2 characters visible
    const middleLength = Math.max(name.length - visibleStart - visibleEnd, 0); // length to mask

   const maskedName =
         name.slice(0, visibleStart) +          // first 4 chars
         "*".repeat(middleLength) +             // mask the middle
         name.slice(name.length - visibleEnd);  // last 2 chars    

    res.json({
      success: true,
      maskedEmail: `${maskedName}@${domain}`
    });

  } catch (err) {
    console.error("❌ RECOVER EMAIL ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};




