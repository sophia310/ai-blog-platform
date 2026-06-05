const User = require("../models/User");

const savePost = async (req, res) => {

  try {

    const user = await User.findById(
      req.user.id
    );

    const postId =
      req.params.postId;

    if (
      user.savedPosts.includes(
        postId
      )
    ) {

      return res.status(400).json({
        message:
          "Post already saved"
      });
    }

    user.savedPosts.push(
      postId
    );

    await user.save();

    res.json({
      message:
        "Post saved successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

const unsavePost = async (req, res) => {

  try {

    const user = await User.findById(
      req.user.id
    );

    const postId =
      req.params.postId;

    user.savedPosts =
      user.savedPosts.filter(
        id =>
          id.toString() !==
          postId
      );

    await user.save();

    res.json({
      message:
        "Post removed from saved"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

const getSavedPosts =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        ).populate(
          "savedPosts"
        );

      res.json(
        user.savedPosts
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error"
      });
    }
  };

module.exports = {
  savePost,
  unsavePost,
  getSavedPosts
};