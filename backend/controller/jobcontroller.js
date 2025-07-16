const Job = require("../models/jobmodel");
const User = require("../models/usermodel");
// const { sendEmail } = require("../service/emailservice.js");

exports.createJob = async (req, res) => {
  try {
    const { title, description, location, category, budget, deadline } =
      req.body;
    if (
      !title ||
      !description ||
      !location ||
      !category ||
      !budget ||
      !deadline
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }
    // Find the user by Firebase UID
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User not found or not authorized." });
    }
    console.log("Creating job for user:", user._id, user.email);
    const job = await Job.create({
      title,
      description,
      location,
      category,
      budget,
      deadline,
      postedBy: user._id,
    });
    // try {
    //   await sendEmail(
    //     user.email,
    //     "Job Posted Successfully",
    //     `Your job \"${title}\" has been posted successfully.`
    //   );
    //   console.log("Job posting email sent");
    // } catch (error) {
    //   console.error("Error sending job posting email:", error);
    // }
    res
      .status(201)
      .json({ status: "Success", message: "Job created", data: { job } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.listJobs = async (req, res) => {
  try {
    const { location, category } = req.query;
    let filter = {};
    if (location) filter.location = location;
    if (category) filter.category = category;
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ status: "Success", data: { jobs } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getJobDetails = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.status(200).json({ status: "Success", data: { job } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
