const mongoose = require("mongoose");

// Message sub-schema
const messageSchema = new mongoose.Schema({
  text: String,
  timestamp: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Channel schema
const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Reference to User documents
  messages: [messageSchema], // Embedding messages directly in the channel
});

const Channel = mongoose.model("Channel", channelSchema);
module.exports = Channel;
