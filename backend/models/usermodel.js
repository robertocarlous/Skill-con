const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    enum: ["artisan", "client", ""],
    default: "",
  },
  // Profile fields for both
  profileImage: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  // Artisan-specific fields
  skill: {
    type: String,
    default: "",
  },
  yearsOfExperience: {
    type: String,
    default: "",
  },
  // Profile completion status
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  uploads: {
    type: [String],
    default: [],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("User", userSchema);
