const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
//   walletAddress: { type: String, required: true },
});

const Channel = mongoose.model('Channels', userSchema);
module.exports = Channel;