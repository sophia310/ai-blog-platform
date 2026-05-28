const transporter = require("../config/mail");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ==========================================
// REGISTER USER
// ==========================================

const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // GENERATE OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // CREATE USER
    const user = await User.create({

      name,

      email,

      password: hashedPassword,

      otp,

      otpExpires:
        Date.now() + 10 * 60 * 1000,

      isVerified: false
    });

    // SEND OTP EMAIL
    try {

      console.log("Before SendMail");

      const info =
        await transporter.sendMail({

          from:
            process.env.EMAIL_USER,

          to: email,

          subject:
            "Lumina Email Verification",

          html: `
            <div style="
              font-family:sans-serif;
              padding:20px;
            ">

              <h2>
                Welcome to Lumina
              </h2>

              <p>
                Your verification OTP is:
              </p>

              <h1>
                ${otp}
              </h1>

              <p>
                This OTP expires in 10 minutes.
              </p>

            </div>
          `
        });

      console.log("After SendMail");

      console.log(info);

    } catch (mailError) {

      console.log(
        "========= MAIL ERROR ========="
      );

      console.log(mailError);

      console.log(
        "=============================="
      );
    }

    res.status(201).json({

      message:
        "OTP sent to your email"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Registration failed"
    });
  }
};


// ==========================================
// LOGIN USER
// ==========================================

const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        message:
          "Invalid email or password"
      });
    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        message:
          "Invalid email or password"
      });
    }

    // CHECK EMAIL VERIFIED
    if (!user.isVerified) {

      return res.status(400).json({

        message:
          "Please verify your email first"
      });
    }

    // GENERATE JWT
    const token = jwt.sign(

      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "7d" }
    );

    res.json({

      message:
        "Login successful",

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role:
          user.role || "",

        instagram:
          user.instagram || "",

        profilePicture:
          user.profilePicture || ""
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server error"
    });
  }
};


// ==========================================
// VERIFY OTP
// ==========================================

const verifyOtp = async (req, res) => {

  try {

    const {
      email,
      otp
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(404).json({

        message:
          "User not found"
      });
    }

    // INVALID OTP
    if (user.otp !== otp) {

      return res.status(400).json({

        message:
          "Invalid OTP"
      });
    }

    // EXPIRED OTP
    if (user.otpExpires < Date.now()) {

      return res.status(400).json({

        message:
          "OTP expired"
      });
    }

    // VERIFY USER
    user.isVerified = true;

    user.otp = null;

    user.otpExpires = null;

    await user.save();

    res.json({

      message:
        "Email verified successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "OTP verification failed"
    });
  }
};


// ==========================================
// FORGOT PASSWORD
// ==========================================

const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(404).json({

        message:
          "User not found"
      });
    }

    // GENERATE OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.otp = otp;

    user.otpExpires =
      Date.now() + 10 * 60 * 1000;

    await user.save();

    // SEND MAIL
    try {

      console.log(
        "Before ForgotPassword SendMail"
      );

      const info =
        await transporter.sendMail({

          from:
            process.env.EMAIL_USER,

          to: email,

          subject:
            "Lumina Password Reset",

          html: `
            <div style="
              font-family:sans-serif;
              padding:20px;
            ">

              <h2>
                Password Reset
              </h2>

              <p>
                Your OTP is:
              </p>

              <h1>
                ${otp}
              </h1>

              <p>
                This OTP expires in 10 minutes.
              </p>

            </div>
          `
        });

      console.log(
        "After ForgotPassword SendMail"
      );

      console.log(info);

    } catch (mailError) {

      console.log(
        "========= FORGOT PASSWORD MAIL ERROR ========="
      );

      console.log(mailError);

      console.log(
        "=============================================="
      );
    }

    res.json({

      message:
        "OTP sent to email"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Failed to send OTP"
    });
  }
};


// ==========================================
// RESET PASSWORD
// ==========================================

const resetPassword = async (req, res) => {

  try {

    const {
      email,
      otp,
      newPassword
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(404).json({

        message:
          "User not found"
      });
    }

    // INVALID OTP
    if (user.otp !== otp) {

      return res.status(400).json({

        message:
          "Invalid OTP"
      });
    }

    // OTP EXPIRED
    if (user.otpExpires < Date.now()) {

      return res.status(400).json({

        message:
          "OTP expired"
      });
    }

    // HASH NEW PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    user.otp = null;

    user.otpExpires = null;

    await user.save();

    res.json({

      message:
        "Password reset successful"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Password reset failed"
    });
  }
};


// ==========================================
// EXPORTS
// ==========================================

module.exports = {

  registerUser,

  loginUser,

  verifyOtp,

  forgotPassword,

  resetPassword
};