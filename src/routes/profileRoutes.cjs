const express = require("express");
const router = express.Router();
const User = require("../models/User.cjs");

// Create Profile
router.post("/", async (req, res) => {
  try {
    const { phone, name, gender, email, dateOfBirth, emergencyContact } = req.body;

    if (!phone || !name || !gender) {
      return res.status(400).json({ message: "Phone, name, and gender are required." });
    }

    // Check if the user already exists
    let user = await User.findOne({ phone });

    if (user) {
      return res.status(200).json({ message: "User already exists." });
    }

    // Create a new user
    user = new User({ phone, name, gender, email, dateOfBirth, emergencyContact });
    await user.save();

    return res.status(201).json({
      message: "Profile created successfully.",
      user: {
        ...user._doc,
        memberSince: formatMemberSince(user.createdAt),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update Profile
router.put("/:phone", async (req, res) => {
  try {
    const { phone } = req.params; // Get phone from URL
    const { name, gender, email, dateOfBirth, emergencyContact } = req.body;

    // Find the user by phone number
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update only the provided fields
    if (name !== undefined) user.name = name;
    if (gender !== undefined) user.gender = gender;
    if (email !== undefined) user.email = email;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
    if (emergencyContact !== undefined) user.emergencyContact = emergencyContact;

    // Save the updated user
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        ...user._doc,
        memberSince: formatMemberSince(user.createdAt),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch Profile
router.get("/:phone", async (req, res) => {
  try {
    const { phone } = req.params;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "Profile fetched successfully.",
      user: {
        ...user._doc,
        memberSince: formatMemberSince(user.createdAt),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete Profile
router.delete("/:phone", async (req, res) => {
  try {
    const { phone } = req.params;

    const user = await User.findOneAndDelete({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "Profile deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Helper Function to Format Member Since
function formatMemberSince(createdAt) {
  const date = new Date(createdAt);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

module.exports = router;
