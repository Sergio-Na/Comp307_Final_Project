const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
  bio: String,
  profilePicture: String,
});

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;
