const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const User = require("../models/userSchema");

require("dotenv").config();

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, bio, profilePicture } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      bio,
      profilePicture,
    });

    await newUser.save();
    const userResponse = newUser.toObject();
    delete userResponse.password;
    delete userResponse.__v;
    res
      .status(201)
      .json({ message: "User created successfully", user: userResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Users Route (for testing)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).select("-password -__v");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update User Information
router.put("/update-profile", authenticate, async (req, res) => {
  try {
    const updates = req.body;
    const userId = req.user.userId;

    const allowedUpdates = [
      "firstName",
      "lastName",
      "email",
      "bio",
      "profilePicture",
    ];
    const actualUpdates = {};
    for (const key of allowedUpdates) {
      if (updates[key]) {
        actualUpdates[key] = updates[key];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, actualUpdates, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send("User not found.");
    }

    const updatedUserResponse = updatedUser.toObject();
    delete updatedUserResponse.password;
    delete updatedUserResponse.__v;
    res.json({
      message: "User updated successfully",
      user: updatedUserResponse,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete-account", authenticate, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.userId);
    if (!deletedUser) return res.status(404).send("User not found.");

    res.send("Account has been deleted successfully.");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

module.exports = router;
