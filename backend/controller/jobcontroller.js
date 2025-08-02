const Job = require("../models/jobmodel");
const User = require("../models/usermodel");
// const { sendEmail } = require("../service/emailservice.js");

exports.createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      keySkills,
      location,
      proposedBudget,
      timeline,
      jobDescription,
    } = req.body;

    if (
      !jobTitle ||
      !keySkills ||
      !location ||
      !proposedBudget ||
      !timeline ||
      !jobDescription
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User not found or not authorized." });
    }

    const job = await Job.create({
      jobTitle,
      keySkills,
      location,
      proposedBudget,
      timeline,
      jobDescription,
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
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.listJobs = async (req, res) => {
  try {
    const { location, keySkills } = req.query;
    let filter = {};
    if (location) filter.location = location;
    if (keySkills) filter.keySkills = { $regex: keySkills, $options: "i" };

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
