// index.js
require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Firebase Admin SDK Init
const serviceAccount = require("./firebase-service.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Endpoint: POST /profile
app.post("/profile", async (req, res) => {
  try {
    const { userId, name, role, certUrl } = req.body;

    if (!userId || !name || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const data = {
      name,
      role,
      certUrl: certUrl || null,
    };

    await db.collection("users").doc(userId).set(data);
    res.status(200).json({ message: "Profile created", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
