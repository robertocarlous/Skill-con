const User = require("../models/usermodel");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cloudinary = require("../utils/cloudinary");

// GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    // Find user in MongoDB by Firebase UID
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("User profile fetched after login:", user);
    res.json({
      uid: user.firebaseUid,
      email: user.email,
      role: user.role,
      emailVerified: user.isVerified,
      profileCompleted: user.profileCompleted,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
};

// PUT /api/profile

exports.updateProfile = async (req, res) => {
  try {
    console.log("Decoded Firebase UID:", req.user.uid);

    const {
      bio,
      address,
      profileImage,
      location,
      skill,
      yearsOfExperience,
      uploads,
    } = req.body;

    // Find user by Firebase UID
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields
    if (bio !== undefined) user.bio = bio;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (location !== undefined) user.location = location;
    if (skill !== undefined) user.skill = skill;
    if (yearsOfExperience !== undefined)
      user.yearsOfExperience = yearsOfExperience;
    if (uploads !== undefined) user.uploads = uploads;
    if (address !== undefined) user.address = address;

    // Profile completion logic
    let profileCompleted = false;
    if (user.role === "client") {
      if (user.profileImage && user.bio && user.location) {
        profileCompleted = true;
      }
    } else if (user.role === "artisan") {
      if (
        user.profileImage &&
        user.bio &&
        user.location &&
        user.skill &&
        typeof user.yearsOfExperience === "string" &&
        user.yearsOfExperience.trim() !== "" &&
        Array.isArray(user.uploads) &&
        user.uploads.length > 0
      ) {
        profileCompleted = true;
      }
    }
    user.profileCompleted = profileCompleted;

    await user.save();

    res.json({
      message: "Profile updated",
      user: {
        ...user.toObject(),
        role: user.role,
        profileCompleted: user.profileCompleted,
      },
      profileCompleted: user.profileCompleted,
      role: user.role,
    });
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).json({ error: "Error updating profile" });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded." });
    }

    const file = req.file.path;

    const result = await cloudinary.uploader.upload(file, {
      folder: "profiles",
    });

    const updated = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid }, // Use firebaseUid
      { profileImage: result.secure_url }, // Use profileImage
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Image uploaded", image: updated.profileImage });
  } catch (error) {
    console.error(error);
    console.log("req.file:", req.file); // Should print the uploaded file object
    console.log("req.body:", req.body); // Should print any additional form data
    res.status(500).json({ error: "Image upload failed" });
  }
};

exports.uploadCertification = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ error: "No certification files uploaded." });
    }
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (user.role !== "artisan") {
      return res
        .status(403)
        .json({ error: "Only artisans can upload certifications." });
    }
    user.uploads = user.uploads || [];
    if (user.uploads.length >= 3) {
      return res
        .status(400)
        .json({ error: "You can upload a maximum of 3 certifications." });
    }
    // Only allow up to 3 in total
    const availableSlots = 3 - user.uploads.length;
    const filesToUpload = req.files.slice(0, availableSlots);
    const uploadedUrls = [];
    for (const file of filesToUpload) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "certifications",
      });
      user.uploads.push(result.secure_url);
      uploadedUrls.push(result.secure_url);
    }
    await user.save();
    res.json({
      message: "Certifications uploaded",
      certifications: uploadedUrls,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Certification upload failed" });
  }
};
