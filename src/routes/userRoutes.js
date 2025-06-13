const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/save", async (req, res) => {
  console.log("\n--- /save Route Hit ---");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  try {
    const { phone, name, gender } = req.body;

    // Basic validation
    if (!phone || !name || !gender) {
      console.error("Validation failed: Missing phone, name or gender");
      return res.status(400).json({ message: "Phone, name, and gender are required." });
    }
    console.log("Validation passed");

    // Check for existing user
    console.log("Looking for existing user with phone:", phone);
    let user = await User.findOne({ phone });

    if (user) {
      console.log("User exists, updating details...");
      user.name = name;
      user.gender = gender;
      await user.save();
      console.log("User updated:", user);
    } else {
      console.log("No existing user found, creating new one...");
      user = new User({ phone, name, gender });
      await user.save();
      console.log("User created:", user);
    }

    res.status(200).json({ message: "User saved successfully", user });
  } catch (error) {
    console.error("Error in /save route:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }

  console.log("--- /save Route Completed ---\n");
});

module.exports = router;
