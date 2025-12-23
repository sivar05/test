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
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* ---------- BODY PARSER ---------- */
app.use(express.json());

/* ---------- DB ---------- */
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('💡 Make sure MongoDB is running locally or check your connection string');
  });
/* ---------- ROUTES ---------- */

app.use("/api/auth", require("./routes/auth_routes"));

app.use("/api/password", require("./routes/password_routes"));
app.use("/api/forgotemail", require("./routes/forgotemail_routes"));

// Add this line (remove the duplicate one if exists)
app.use('/api/forgotpassword', require('./routes/forgotpassword_routes'));
app.post("/api/forgotpassword", require("./controllers/forgotpassword_controller").sendResetLink);
app.post("/api/forgotpassword/resetpassword", require("./controllers/forgotpassword_controller").resetPassword);




/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

mongoose.connection.once("open", () => {
  console.log("📦 Connected DB name:", mongoose.connection.name);
});
