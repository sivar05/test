const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

/* CONNECT LOCAL MONGODB */
mongoose.connect("mongodb://127.0.0.1:27017/signupDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* USER SCHEMA */
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  confirm:String,
  mobile:String
});

const User = mongoose.model("User", UserSchema);

/* SIGNUP API */
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "Saved in MongoDB" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
