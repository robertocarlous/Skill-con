const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const auth = require("../middleware/auth");
const {
    getProfile,
    updateProfile,
    uploadImage,
} = require("../controller/userprofile");

router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);
router.post("/upload", auth, upload.single("image"), uploadImage);

module.exports = router;
