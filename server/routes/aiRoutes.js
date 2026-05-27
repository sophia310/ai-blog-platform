const express = require("express");
const rateLimit = require("express-rate-limit");
const verifyToken = require("../middleware/verifyToken");
const { getSeoBrief } = require("../controllers/aiController");

const router = express.Router();

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message: "Too many AI requests. Please try again after a minute."
  }
});

router.post("/seo", verifyToken, aiLimiter, getSeoBrief);

module.exports = router;