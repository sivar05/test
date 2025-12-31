const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");  
require("dotenv").config();

const app = express();


/* ---------- CORS ---------- */
app.use(cors({
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://sivar05.github.io"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* ---------- BODY PARSER ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- DB ---------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
    console.log("📦 DB NAME:", mongoose.connection.name);
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));

/* ---------- MENU SCHEMA ---------- */
const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: String,
  action: String
});

const Menu = mongoose.model("Menu", menuSchema);

/* ---------- ROUTES ---------- */
app.use("/api/auth", require("./routes/auth_routes"));
app.use("/api/password", require("./routes/password_routes"));
app.use("/api/forgotemail", require("./routes/forgotemail_routes"));
app.use("/api/forgotpassword", require("./routes/forgotpassword_routes"));


// Optional: keep controller endpoints only if not in forgotpassword_routes
app.post("/api/forgotpassword", require("./controllers/forgotpassword_controller").sendResetLink);
app.use("/", require("./routes/homemenu"));
app.use(require("./routes/wildimage_routes"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/home",require("./routes/homemenu"));



/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

