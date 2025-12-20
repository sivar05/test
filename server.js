const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();

/* ---------- CORS ---------- */
app.use(cors({
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://sivar05.github.io"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* ---------- BODY PARSER ---------- */
app.use(express.json());

/* ---------- DB ---------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo error:", err));

/* ---------- ROUTES ---------- */
app.use("/api/auth", require("./routes/auth_routes"));
app.use("/api/password", require("./routes/password_routes"));
app.use("/api/forgotemail", require("./routes/forgotemail_routes"));
app.use("/api", require("./routes/forgotpassword_routes"));

console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "LOADED" : "MISSING");


/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

mongoose.connection.once("open", () => {
  console.log("📦 Connected DB name:", mongoose.connection.name);
});
