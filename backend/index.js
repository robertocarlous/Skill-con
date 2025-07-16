require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const admin = require("./utils/firebase");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const http = require("http");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = admin.firestore();

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" MongoDB connected");

    // Start server only after MongoDB connection
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });

// Firebase Profile Creation Endpoint (still Firestore-based)
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

// Routes
app.use("/api/profile", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use(errorHandler);
