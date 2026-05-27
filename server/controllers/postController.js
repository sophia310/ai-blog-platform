const Post = require(
  "../models/Post"
);

/* CREATE POST */

const createPost = async (
  req,
  res
) => {

  try {

    const {
      title,
      content,
      metaDescription
    } = req.body;

    const tags = JSON.parse(
      req.body.tags || "[]"
    );

    const post =
      await Post.create({

        title,

        content,

        tags,

        metaDescription,

        coverImage:
          req.file?.path || "",

        author:
          req.user.id
      });

    res.status(201).json({

      message:
        "Post created successfully",

      post
    });

  } catch (error) {

    console.log(error.message);

console.log(error);

    res.status(500).json({

      message:
        "Server error",

      error:
        error.message
    });
  }
};

/* GET ALL POSTS */

const getAllPosts = async (
  req,
  res
) => {

  try {

    const posts =
      await Post.find()

        .populate(
          "author",
          "name email"
        )

        .sort({
          createdAt: -1
        });

    res.json(posts);

  } catch (error) {

    res.status(500).json({

      message:
        "Server error",

      error:
        error.message
    });
  }
};

/* GET SINGLE POST */

const getSinglePost = async (
  req,
  res
) => {

  try {

    const post =
      await Post.findById(
        req.params.id
      ).populate(
        "author",
        "name email"
      );

    if (!post) {

      return res.status(404).json({

        message:
          "Post not found"
      });
    }

    res.json(post);

  } catch (error) {

    res.status(500).json({

      message:
        "Server error",

      error:
        error.message
    });
  }
};

/* UPDATE POST */

const updatePost = async (
  req,
  res
) => {

  try {

    const post =
      await Post.findById(
        req.params.id
      );

    if (!post) {

      return res.status(404).json({

        message:
          "Post not found"
      });
    }

    if (
      post.author.toString()
      !== req.user.id
    ) {

      return res.status(403).json({

        message:
          "Not allowed"
      });
    }

    const tags = JSON.parse(
      req.body.tags || "[]"
    );

    const updatedData = {

      title:
        req.body.title,

      content:
        req.body.content,

      tags,

      metaDescription:
        req.body.metaDescription
    };

    /* NEW IMAGE */

    if (req.file) {

      updatedData.coverImage =
        req.file.path;
    }

    const updatedPost =
      await Post.findByIdAndUpdate(

        req.params.id,

        updatedData,

        { new: true }
      );

    res.json({

      message:
        "Post updated successfully",

      post:
        updatedPost
    });

  } catch (error) {

    console.log(error.message);

console.log(error);

    res.status(500).json({

      message:
        "Server error",

      error:
        error.message
    });
  }
};

/* DELETE POST */

const deletePost = async (
  req,
  res
) => {

  try {

    const post =
      await Post.findById(
        req.params.id
      );

    if (!post) {

      return res.status(404).json({

        message:
          "Post not found"
      });
    }

    if (
      post.author.toString()
      !== req.user.id
    ) {

      return res.status(403).json({

        message:
          "Not allowed"
      });
    }

    await post.deleteOne();

    res.json({

      message:
        "Post deleted successfully"
    });

  } catch (error) {

    res.status(500).json({

      message:
        "Server error",

      error:
        error.message
    });
  }
};

module.exports = {

  createPost,

  getAllPosts,

  getSinglePost,

  updatePost,

  deletePost
};