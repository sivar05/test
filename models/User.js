// models/User.js
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'Email is required']
  },
  mobilenumber: {
    type: String,
    required: [true, 'Mobile number is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8
  },
  resetToken: String,
  resetTokenExpiry: Date
}, {
  timestamps: true
});

// Hash password before saving - FIXED VERSION
userSchema.pre('save', async function(next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) {
    if (next && typeof next === 'function') {
      return next();
    }
    return;
  }
  
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash password
    this.password = await bcrypt.hash(this.password, salt);
    
    if (next && typeof next === 'function') {
      return next();
    }
  } catch (error) {
    if (next && typeof next === 'function') {
      return next(error);
    }
    throw error;
  }
});

// Alternative: Use a try-catch without next parameter
userSchema.pre('save', async function() {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) {
    return;
  }
  
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash password
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;