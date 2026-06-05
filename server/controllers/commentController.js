const Comment =
  require("../models/Comment");

const createComment =
  async (req, res) => {

    try {

      const comment =
        await Comment.create({

          post:
            req.params.postId,

          author:
            req.user.id,

          text:
            req.body.text

        });

      res.status(201).json(
        comment
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to add comment"
      });
    }
  };

const getComments =
  async (req, res) => {

    try {

      const comments =
        await Comment.find({
          post:
            req.params.postId
        })
          .populate(
            "author",
            "name profileImage"
          )
          .sort({
            createdAt: -1
          });

      res.json(comments);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to load comments"
      });
    }
  };

module.exports = {
  createComment,
  getComments
};