const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

/* ---------- MULTER CONFIG ---------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"));
    }
  }
});

/* ---------- POST IMAGE ---------- */
/* ---------- POST MULTIPLE IMAGES ---------- */
router.post(
  "/api/wild_images",
  upload.array("images", 20), // 🔴 MUST match <input name="images">
  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No images uploaded" });
      }

      const imageUrls = req.files.map(file =>
        `http://localhost:3000/uploads/${file.filename}`
      );

      res.json({
        success: true,
        images: imageUrls,
        name: req.body.name,
        action: req.body.action
      });

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);


/* ---------- GET IMAGES ---------- */
router.get("/api/wild_images", (req, res) => {
  const fs = require("fs");

  try {
    const files = fs.readdirSync("uploads");
    const images = files.map(f => ({
      image: `http://localhost:3000/uploads/${f}`,
      action: "lion"
    }));

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cannot load images" });
  }
});

module.exports = router;
