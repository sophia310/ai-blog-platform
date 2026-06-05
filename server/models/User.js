const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    profileImage: {
      type: String
    },

    isVerified: {
      type: Boolean,
      default: false
    },


    bio: {
      type: String
    },

    role: {
      type: String,
      default:
        "Visual Artist & Developer"
    },

    instagram: {
      type: String
    },

    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      }
    ],

    resetPasswordToken: String,

    resetPasswordExpires: Date,

    otp: String,

    otpExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);