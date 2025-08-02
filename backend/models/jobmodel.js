const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  keySkills: { type: String, required: true },
  location: { type: String, required: true },
  proposedBudget: { type: Number, required: true },
  timeline: { type: String, required: true },
  jobDescription: { type: String, required: true },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
