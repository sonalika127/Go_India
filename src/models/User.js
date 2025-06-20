const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String },
    dateOfBirth: { type: String },
    emergencyContact: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("User", userSchema);
