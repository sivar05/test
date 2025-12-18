const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

console.log("🔥 CORS ENABLED VERSION 3 🔥");

const app = express();

/* ✅ TRUST PROXY (REQUIRED FOR RAILWAY) */
app.set("trust proxy", 1);

/* ✅ GLOBAL CORS */
app.use(cors({
  origin: "https://sivar05.github.io",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* ✅ EXPLICIT OPTIONS HANDLER (CRITICAL) */
app.options(/.*/, cors());

/* ---------- BODY PARSER ---------- */
app.use(express.json());

/* ---------- DB ---------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo error:", err));

/* ---------- ROUTES ---------- */
app.use("/api/auth", require("./routes/auth_routes"));
app.use("/api/password", require("./routes/password_routes"));

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
