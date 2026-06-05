const express =
  require("express");

const router =
  express.Router();

const verifyToken =
  require(
    "../middleware/verifyToken"
  );

const {
  createComment,
  getComments
} = require(
  "../controllers/commentController"
);

router.get(
  "/:postId",
  getComments
);

router.post(
  "/:postId",
  verifyToken,
  createComment
);

module.exports =
  router;