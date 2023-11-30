const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
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

    res.status(201).json({
      message: "User created successfully. Welcome, " + newUser.firstName + "!",
      user: userResponse,
    });
  } catch (error) {
    let errorMessage = "An error occurred during signup.";
    if (error.code === 11000) {
      errorMessage = "A user with the given email already exists.";
    }
    res.status(500).json({ error: errorMessage });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Invalid email or password. Please try again." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ message: "Login successful. Welcome back!", token });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred during login. Please try again." });
  }
});
//get user by id
router.get("/users/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -__v");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "User retrieved successfully.", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving user information. " + error.message });
  }
});
//get user by email
router.get("/users/email/:email", authenticate, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password -__v"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "User retrieved successfully.", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving user information. " + error.message });
  }
});

// Get All Users Route (for testing)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).select("-password -__v");
    res.json({ message: "Successfully retrieved all users.", users });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users." });
  }
});

// Update User Profile Route
router.put("/update-profile", authenticate, async (req, res) => {
  try {
    const updates = req.body;
    const userId = req.user.userId; // assuming the authenticate middleware sets req.user

    const allowedUpdates = [
      "firstName",
      "lastName",
      "email",
      "password",
      "bio",
      "profilePicture",
    ]; // Add more fields as needed
    const actualUpdates = {};

    // Include only the allowed fields in the actual updates
    for (const key of Object.keys(updates)) {
      if (allowedUpdates.includes(key)) {
        actualUpdates[key] = updates[key];
      }
    }

    // Hash the password if it's being updated
    if (actualUpdates.password) {
      actualUpdates.password = await bcrypt.hash(actualUpdates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, actualUpdates, {
      new: true,
    })
      .select("-password -__v -_id")
      .lean(); // Exclude sensitive fields

    if (!updatedUser) {
      return res.status(404).send("User not found. Profile update failed.");
    }

    res.json({
      message: "Your profile has been updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update profile. Please try again." });
  }
});
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with the given email does not exist." });
    }

    // Generate a temporary random password
    const tempPassword = Math.random().toString(36).slice(-8);

    // Update user's password in the database
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: hashedTempPassword });

    // Set up nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your Gmail address from .env file
        pass: process.env.EMAIL_PASSWORD, // Your App Password from .env file
      },
    });

    // Send email
    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your Password Has Been Reset",
      text: `Your temporary password is: ${tempPassword}. Please log in and change your password immediately.`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; text-align: center; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Password Reset Notification</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.5;">
              A request has been received to change the password for your account. We have generated a temporary password for you.
            </p>
            <div style="background-color: #eaeaea; padding: 10px; margin: 20px 0; border-left: 4px solid #007bff;">
              <p style="margin: 0; font-weight: bold;">Temporary Password:</p>
              <p style="margin: 0; font-size: 18px; color: #007bff;">${tempPassword}</p>
            </div>
            <p style="color: #555; font-size: 16px; line-height: 1.5;">
              Please use this temporary password to log in to your account. For your security, we strongly recommend changing your password immediately after logging in.
            </p>
            <a href="update_with_hosted_link" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; display: inline-block;">
              Log in to Your Account
            </a>
            <p style="color: #777; font-size: 14px; line-height: 1.5; margin-top: 20px;">
              If you did not request a password reset, please contact our support team.
            </p>
          </div>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Error sending email." });
      } else {
        console.log("Email sent: " + info.response);
        res.json({
          message: "Temporary password has been sent to your email.",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Delete Account Route
router.delete("/delete-account", authenticate, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.userId);
    if (!deletedUser)
      return res.status(404).send("User not found. Account deletion failed.");

    res.send(
      "Your account has been deleted successfully. We're sorry to see you go!"
    );
  } catch (error) {
    res.status(500).send("Failed to delete account. Please try again.");
  }
});
router.get("/user-channels/:userId", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("channels");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Select important info from each channel
    const channelsInfo = user.channels.map((channel) => ({
      id: channel._id,
      name: channel.name,
      // Add any other important info you need about the channels here
    }));

    res.json({
      message: "Channels retrieved successfully.",
      channels: channelsInfo,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving channels for the user. " + error.message,
    });
  }
});

module.exports = router;
