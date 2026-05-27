const express = require("express");

const {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost
} = require(
  "../controllers/postController"
);

const verifyToken = require(
  "../middleware/verifyToken"
);

const upload = require(
  "../middleware/upload"
);

const router = express.Router();

/* GET */

router.get(
  "/",
  getAllPosts
);

router.get(
  "/:id",
  getSinglePost
);

/* CREATE */

router.post(
  "/",
  verifyToken,
  upload.single("coverImage"),
  createPost
);

/* UPDATE */

router.put(
  "/:id",
  verifyToken,
  upload.single("coverImage"),
  updatePost
);

/* DELETE */

router.delete(
  "/:id",
  verifyToken,
  deletePost
);

module.exports = router;