const express = require("express");
const router = express.Router();
const JobController = require("../controller/jobcontroller");
const ApplicationController = require("../controller/applicationcontroller");
const auth = require("../middleware/auth");

// Job routes
router.post("/", auth, JobController.createJob);
router.get("/", auth, JobController.listJobs);
router.get("/:id", auth, JobController.getJobDetails);

// Application routes
router.post("/:id/apply", auth, ApplicationController.applyToJob);
router.get("/:id/applicants", auth, ApplicationController.viewApplicants);
router.get("/applications", auth, ApplicationController.viewMyApplications);

module.exports = router;
