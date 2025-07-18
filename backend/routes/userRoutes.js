const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const auth = require("../middleware/auth");
const {
  getProfile,
  updateProfile,
  uploadImage,
  uploadCertification,
} = require("../controller/userprofile");

router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);
router.post("/upload", auth, upload.single("image"), uploadImage);
router.post(
  "/upload-certification",
  auth,
  upload.array("certification", 3),
  uploadCertification
);

module.exports = router;
