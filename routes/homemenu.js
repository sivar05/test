const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Menu = require("../models/homemenu");
const WildImage = require("../models/wildimage"); // Make sure this exists

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer upload
const upload = multer({ storage: storage });

// Get all menu items
router.get("/menu", async (req, res) => {
  const menu = await Menu.find();
  res.json(menu);
});

// Add new menu item
router.post("/api/home_menus", async (req, res) => {
  const newItem = new Menu(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

// Upload multiple images
router.post(
  "/api/wild_images",
  upload.array("images", 20), // 👈 MUST MATCH frontend <input name="images" multiple>
  async (req, res) => {
    try {
      const { name, action } = req.body;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No images uploaded" });
      }

      const docs = req.files.map(file => ({
        name,
        action,
        image: `http://localhost:3000/uploads/${file.filename}`,
      }));

      await WildImage.insertMany(docs);

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

module.exports = router;
