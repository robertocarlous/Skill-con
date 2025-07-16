const admin = require("../utils/firebase");
const User = require("../models/usermodel");
// const { sendEmail } = require("../service/emailservice");

// Signup endpoint
exports.signup = async (req, res) => {
  const { fullName, email, password, confirmPassword, phoneNumber, role } =
    req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
      phoneNumber: phoneNumber || undefined,
    });

    // Save the Firebase user to MongoDB
    const newUser = new User({
      firebaseUid: userRecord.uid,
      fullName,
      email: userRecord.email,
      phoneNumber: phoneNumber || "",
      role: role || "",
      isVerified: false,
    });

    // Generate OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    newUser.otp = otp;
    newUser.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await newUser.save();

    console.log(`Generated OTP for ${newUser.email}: ${otp}`);

    // // Send OTP email
    // await sendEmail(
    //   newUser.email,
    //   "Your SkillConnect OTP",
    //   `Your OTP code is: ${otp}. It will expire in 10 minutes.`
    // );

    return res.status(201).json({
      message: "User successfully created. OTP sent to email.",
      firebaseUid: userRecord.uid,
      mongoId: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

//login endpoint
exports.login = async (req, res) => {
  return res.status(400).json({
    error:
      "Login should be handled on the frontend using Firebase Client SDK. Send ID token to backend.",
  });
};

// OTP Verification Endpoint
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (
    user &&
    user.otp === otp &&
    user.otpExpiry &&
    user.otpExpiry > Date.now()
  ) {
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    // Optionally update Firebase emailVerified
    await admin.auth().updateUser(user.firebaseUid, { emailVerified: true });
    return res.json({ success: true, message: "OTP verified." });
  }
  return res.status(400).json({ error: "Invalid or expired OTP." });
};

//forgot password endpoint
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();
  try {
    await sendEmail(
      email,
      "Your SkillConnect OTP",
      `Your OTP code is: ${otp}. It will expire in 10 minutes.`
    );
    return res.json({ message: "OTP sent to email." });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return res.status(500).json({ error: "Failed to send OTP email." });
  }
};

// Reset Password Endpoint
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (
    !user ||
    user.otp !== otp ||
    !user.otpExpiry ||
    user.otpExpiry < Date.now()
  ) {
    return res.status(400).json({ error: "Invalid or expired OTP." });
  }
  try {
    await admin.auth().updateUser(user.firebaseUid, { password: newPassword });
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    return res.json({ message: "Password updated successfully." });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Set Role Endpoint
exports.setRole = async (req, res) => {
  const { email, role } = req.body;
  if (!email || !role) {
    return res.status(400).json({ error: "Email and role are required." });
  }
  if (!["client", "artisan"].includes(role)) {
    return res.status(400).json({ error: "Invalid role." });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  user.role = role;
  await user.save();
  return res.json({ success: true, message: "Role updated.", role });
};
