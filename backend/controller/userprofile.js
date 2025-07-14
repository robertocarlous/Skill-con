const User = require("../models/usermodel");
const cloudinary = require("../utils/cloudinary");

// GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    const user = req.user;  // Firebase Decoded Token
    res.json({
      uid: user.uid,
      email: user.email,
      emailVerified: user.email_verified,
      signInProvider: user.firebase.sign_in_provider
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
};

// PUT /api/profile

exports.updateProfile = async (req, res) => {
  try {
    console.log('Decoded Firebase UID:', req.user.uid);

    const { bio, address } = req.body;

    const updated = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { bio, address },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile updated", user: updated });

  } catch (error) {
    console.error('Update Error:', error.message);
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
      { firebaseUid: req.user.uid },                  // Use firebaseUid
      { profileImage: result.secure_url },            // Use profileImage
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Image uploaded", image: updated.profileImage });
  } catch (error) {
    console.error(error);
    console.log('req.file:', req.file);     // Should print the uploaded file object
    console.log('req.body:', req.body);     // Should print any additional form data
    res.status(500).json({ error: "Image upload failed" });
  }
};
