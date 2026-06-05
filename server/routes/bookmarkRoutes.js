const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/verifyToken");

const {
  savePost,
  unsavePost,
  getSavedPosts
} = require(
  "../controllers/bookmarkController"
);

router.post(
  "/:postId",
  authMiddleware,
  savePost
);

router.delete(
  "/:postId",
  authMiddleware,
  unsavePost
);

router.get(
  "/",
  authMiddleware,
  getSavedPosts
);

module.exports = router;