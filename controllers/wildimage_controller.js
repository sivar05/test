const WildImage = require("../models/wildimage");

exports.getWildImages = async (req, res) => {
  try {
    const images = await WildImage.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};
