const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/signup_test_db")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

// ROUTES
app.use("/api", require("./routes/auth_routes"));
app.use("/api", require("./routes/password_routes"));

// SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
