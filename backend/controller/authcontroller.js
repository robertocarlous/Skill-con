const admin = require('../utils/firebase');
const User = require('../models/usermodel');


const otpStore = {};


// Signup endpoint   
exports.signup = async (req, res) => {
  const { fullName, email, password, confirmPassword, phoneNumber, role } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
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
      phoneNumber: phoneNumber || '',
      role: role || 'client',  // optional in request, defaults to client
    });

    await newUser.save();

    return res.status(201).json({
      message: 'User successfully created',
      firebaseUid: userRecord.uid,
      mongoId: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });

  } catch (error) {
    console.error('Signup Error:', error.message);
    return res.status(400).json({ error: error.message });
  }
};

//login endpoint  
exports.login = async (req, res) => {
  return res.status(400).json({
    error: 'Login should be handled on the frontend using Firebase Client SDK. Send ID token to backend.',
  });
};

// OTP Verification Endpoint   
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email];
    return res.json({ success: true, message: 'OTP verified.' });
  }
  return res.status(400).json({ error: 'Invalid or expired OTP.' });
};

//forgot password endpoint  

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;
  return res.json({ message: 'OTP sent to email (simulated)', otp });
};


// Reset Password Endpoint   
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!otpStore[email] || otpStore[email] !== otp) {
    return res.status(400).json({ error: 'Invalid or expired OTP.' });
  }
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().updateUser(user.uid, { password: newPassword });
    delete otpStore[email];
    return res.json({ message: 'Password updated successfully.' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
