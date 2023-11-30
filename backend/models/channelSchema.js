const mongoose = require("mongoose");

// Message sub-schema
const messageSchema = new mongoose.Schema({
  text: String,
  timestamp: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// User-Role sub-schema for Channel
const userRoleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  role: String, // e.g., 'admin', 'member', etc.
});

// Channel schema
const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userRoles: [userRoleSchema], // Includes user references with their roles
  messages: [messageSchema], // Embedding messages directly in the channel
});

const Channel = mongoose.model("Channel", channelSchema, "Channels");
module.exports = Channel;
