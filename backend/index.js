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

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });

// Routes
app.use("/api/profile", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use(errorHandler);
