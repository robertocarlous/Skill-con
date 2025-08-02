const admin = require("../utils/firebase");
const User = require("../models/usermodel");

exports.signup = async (req, res) => {
  const { fullName, email, idToken } = req.body;

  if (!fullName || !email || !idToken) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Verify the Firebase ID token
    const decoded = await admin.auth().verifyIdToken(idToken);

    // Check if user already exists in MongoDB
    let user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        fullName,
        email,
        isVerified: decoded.email_verified,
      });
    }

    return res.status(201).json({
      message: "User successfully created.",
      firebaseUid: user.firebaseUid,
      mongoId: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

// Login endpoint (handled by Firebase client SDK)
exports.login = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "No ID token provided" });
  }

  try {
    await admin.auth().verifyIdToken(idToken);

    // Set cookie
    res.cookie("session", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("session");
  return res.status(200).json({ message: "Logged out successfully" });
};

// Set Role Endpoint
exports.setRole = async (req, res) => {
  const { role } = req.body;
  const cookies = req.cookies;
  console.log("Cookies:", cookies);
  const idToken = cookies?.session;

  if (!idToken) {
    return res
      .status(401)
      .json({ error: "No Firebase token provided in cookies." });
  }

  if (!role || !["client", "artisan"].includes(role)) {
    return res.status(400).json({ error: "Valid role is required." });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const uid = decoded.uid;

    let user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      user = new User({ firebaseUid: uid, role });
    } else {
      user.role = role;
    }

    await user.save();

    return res.json({ success: true, message: "Role updated.", role });
  } catch (error) {
    console.error("Error verifying token or updating role:", error);
    return res.status(400).json({ error: error.message });
  }
};
