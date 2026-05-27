const User = require("../models/User");

const cloudinary =
  require("../config/cloudinary");

const updateProfile =
  async (req, res) => {

    try {

      const {
        name,
        role,
        instagram
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {

        return res.status(404).json({
          message: "User not found"
        });
      }

      // Upload profile image
      if (req.file) {

        const result =
          await cloudinary.uploader.upload(
            req.file.path,
            {
              folder:
                "lumina_profiles"
            }
          );

        user.profileImage =
          result.secure_url;
      }

      user.name =
        name || user.name;

      user.role =
        role || user.role;

      user.instagram =
        instagram ||
        user.instagram;

      await user.save();

      res.json({
        message:
          "Profile updated successfully",

        user
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error"
      });
    }
};

module.exports = {
  updateProfile
};