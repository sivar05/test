const otpStore = new Map();

module.exports = {
  saveOTP: (mobile, otp) => {
    otpStore.set(mobile, {
      otp,
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    });
  },

  verifyOTP: (mobile, otp) => {
    const record = otpStore.get(mobile);
    if (!record) return false;
    if (Date.now() > record.expires) return false;
    return record.otp === otp;
  },

  deleteOTP: (mobile) => otpStore.delete(mobile)
};
