const express = require("express");

const {
  updateProfile
} = require("../controllers/userController");

const verifyToken =
  require("../middleware/verifyToken");

const upload =
  require("../middleware/upload");

const router = express.Router();

router.put(
  "/profile",
  verifyToken,
  upload.single("profileImage"),
  updateProfile
);

module.exports = router;