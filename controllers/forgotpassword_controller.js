// controllers/forgotpassword_controller.js
const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require('bcryptjs');
const transporter = require("../utils/transporter.js");

/* ---------- SEND RESET LINK ---------- */
exports.sendResetLink = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // For security, don't reveal if email exists or not
      return res.json({ 
        success: true, 
        message: "If your email is registered, you will receive a reset link shortly" 
      });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");

    // Store token and expiry (15 minutes) - Use updateOne to bypass hooks
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          resetToken: token,
          resetTokenExpiry: Date.now() + 15 * 60 * 1000
        }
      }
    );

 // In forgotpassword_controller.js - SEND RESET LINK function
// Create reset URL with correct path
const frontendBase = process.env.FRONTEND_URL || "http://localhost:5500";
const resetLink = `${frontendBase}/test/forgotpassword/forgotpassword.html?token=${token}&email=${encodeURIComponent(email)}`;

console.log("✅ Reset link created for:", email);
console.log("🔗 Reset link:", resetLink);

    // Send email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || "noreply@yourapp.com",
        to: email,
        subject: "Password Reset Request",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Password Reset Request</h2>
            <p>You requested a password reset for your account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetLink}" 
               style="display: inline-block; padding: 12px 24px; 
                      background-color: #4CAF50; color: white; 
                      text-decoration: none; border-radius: 4px; 
                      margin: 20px 0;">
              Reset Password
            </a>
            <p>This link will expire in 15 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr>
            <p style="color: #666; font-size: 12px;">
              Or copy and paste this link in your browser:<br>
              ${resetLink}
            </p>
          </div>
        `
      });
      console.log("📧 Email sent to:", email);
    } catch (emailError) {
      console.error("❌ Email sending error:", emailError);
      // Still send success response since token was generated
    }

    res.json({ 
      success: true, 
      message: "Password reset link sent to your email" 
    });

  } catch (err) {
    console.error("❌ Forgot password error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send reset link. Please try again." 
    });
  }
};

/* ---------- RESET PASSWORD ---------- */
exports.resetPassword = async (req, res) => {
  try {
    const { token, email, newPassword } = req.body;

    console.log("🔄 Reset password request received:", { 
      hasToken: !!token, 
      email: email ? `${email.substring(0, 3)}...` : 'none',
      passwordLength: newPassword ? newPassword.length : 0 
    });

    // Validate input
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ 
        success: false, 
        message: "Password must be at least 8 characters" 
      });
    }

    let user;
    let query = {};
    
    // If token is provided, find by token
    if (token) {
      query = {
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }
      };
    } 
    // If no token but email, find by email (for direct access without token)
    else if (email) {
      query = { email: email.toLowerCase().trim() };
    } 
    // Neither token nor email
    else {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid reset request" 
      });
    }

    user = await User.findOne(query);
    
    if (!user) {
      console.log("❌ User not found with query:", query);
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or expired reset link. Please request a new one." 
      });
    }

    console.log("✅ User found:", user.email);

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update user password and clear reset token
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null
        }
      }
    );

    console.log("✅ Password updated for:", user.email);

    // Send confirmation email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || "noreply@yourapp.com",
        to: user.email,
        subject: "Password Changed Successfully",
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Password Updated</h2>
            <p>Your password has been successfully changed.</p>
            <p>If you didn't make this change, please contact support immediately.</p>
          </div>
        `
      });
      console.log("📧 Confirmation email sent to:", user.email);
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    res.json({ 
      success: true, 
      message: "Password has been reset successfully" 
    });

  } catch (err) {
    console.error("❌ Reset password error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to reset password. Please try again." 
    });
  }
};