const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const Channel = require("../models/channelSchema");
const authenticate = require("../middleware/authenticate");

// Function to format user data with role
const formatUserDataWithRole = (user, role) => {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePicture: user.profilePicture,
    role: role,
  };
};

// Create a new channel with the creator as admin
router.post("/channels", authenticate, async (req, res) => {
  try {
    const channel = new Channel({
      name: req.body.name,
      userRoles: [{ user: req.user.userId, role: "admin" }],
    });
    await channel.save();
    res.status(201).json({
      message: "Channel created successfully.",
      channelId: channel._id,
    });
  } catch (error) {
    res.status(400).json({ error: "Error creating channel. " + error.message });
  }
});

// Update a channel name by ID
router.patch("/channels/:id/name", authenticate, async (req, res) => {
  try {
    const channel = await Channel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true }
    );
    if (!channel) {
      return res.status(404).json({ error: "Channel not found." });
    }
    res.json({
      message: "Channel name updated successfully.",
      channelId: channel._id,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating channel name. " + error.message });
  }
});

// Add a user to a channel
router.post("/channels/:id/users", authenticate, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ error: "Channel not found." });
    }

    const userToAdd = await User.findOne({ email: req.body.email });
    if (!userToAdd) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check for duplicate user in the channel
    const isUserAlreadyInChannel = channel.userRoles.some((ur) =>
      ur.user.equals(userToAdd._id)
    );
    if (isUserAlreadyInChannel) {
      return res.status(409).json({ error: "User already in the channel." });
    }

    // Add user to the channel
    const newRole = "member";
    channel.userRoles.push({ user: userToAdd._id, role: newRole });
    await channel.save();

    // Add channel to the user's list of channels
    if (!userToAdd.channels.includes(channel._id)) {
      userToAdd.channels.push(channel._id);
      await userToAdd.save();
    }

    res.status(200).json({
      message: "User added to the channel successfully.",
      user: formatUserDataWithRole(userToAdd, newRole),
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error adding user to channel. " + error.message });
  }
});

// Edit roles of users in a channel
router.patch("/channels/:id/users/roles", authenticate, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ error: "Channel not found." });
    }

    const isAdmin = channel.userRoles.some(
      (ur) => ur.user.equals(req.user.userId) && ur.role === "admin"
    );
    if (!isAdmin) {
      return res.status(403).json({ error: "Only admins can edit roles." });
    }

    const userToEdit = await User.findOne({ email: req.body.email });
    if (!userToEdit) {
      return res.status(404).json({ error: "User not found." });
    }

    const userRoleIndex = channel.userRoles.findIndex((ur) =>
      ur.user.equals(userToEdit._id)
    );
    if (userRoleIndex === -1) {
      return res.status(404).json({ error: "User not in channel." });
    }

    channel.userRoles[userRoleIndex].role = req.body.role;
    await channel.save();
    res.json({
      message: "User role updated successfully.",
      user: formatUserDataWithRole(userToEdit, req.body.role),
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating user role. " + error.message });
  }
});

// Add a message to a channel
router.post("/channels/:id/messages", authenticate, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ error: "Channel not found." });
    }

    channel.messages.push({ text: req.body.text, user: req.user.userId });
    await channel.save();
    res.status(201).json({
      message: "Message added to channel successfully.",
      channelId: channel._id,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error adding message to channel. " + error.message });
  }
});

// Retrieve messages from a channel
router.get("/channels/:id/messages", authenticate, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate(
      "messages.user"
    );
    if (!channel) {
      return res.status(404).json({ error: "Channel not found." });
    }
    const formattedMessages = channel.messages.map((msg) => ({
      text: msg.text,
      timestamp: msg.timestamp,
      user: formatUserDataWithRole(
        msg.user,
        channel.userRoles.find((ur) => ur.user.equals(msg.user._id)).role
      ),
    }));
    res.json({
      message: "Messages retrieved successfully.",
      messages: formattedMessages,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving messages. " + error.message });
  }
});

// Remove a user from a channel
router.delete("/channels/:id/users", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userEmail = req.body.email;

    const channel = await Channel.findById(id);
    if (!channel) {
      return res.status(404).json({ error: "Channel not found." });
    }

    // Check if the requestor is an admin in the channel
    const isAdmin = channel.userRoles.some(
      (ur) => ur.user.equals(req.user.userId) && ur.role === "admin"
    );
    if (!isAdmin) {
      return res.status(403).json({ error: "Only admins can remove users." });
    }

    // Find user by email
    const userToRemove = await User.findOne({ email: userEmail });
    if (!userToRemove) {
      return res.status(404).json({ error: "User not found." });
    }

    // Remove user from the channel
    channel.userRoles = channel.userRoles.filter(
      (ur) => !ur.user.equals(userToRemove._id)
    );
    await channel.save();

    // Remove channel from the user's list of channels
    userToRemove.channels = userToRemove.channels.filter(
      (chId) => !chId.equals(channelId)
    );
    await userToRemove.save();

    res.json({ message: "User removed from the channel successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error removing user from channel. " + error.message });
  }
});
router.get("/channels/:id", authenticate, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate(
      "userRoles.user",
      "firstName lastName email profilePicture"
    );
    if (!channel) {
      return res.status(404).json({ error: "Channel not found." });
    }

    const formattedUserRoles = channel.userRoles.map((ur) => ({
      ...formatUserDataWithRole(ur.user, ur.role),
    }));

    res.json({
      message: "Channel retrieved successfully.",
      channel: {
        id: channel._id,
        name: channel.name,
        userRoles: formattedUserRoles,
        messages: channel.messages, // Consider populating message sender info if needed
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving channel information. " + error.message,
    });
  }
});

module.exports = router;
