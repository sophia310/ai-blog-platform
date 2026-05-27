const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const verifyOtp = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.otp !== otp) {

      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    if (user.otpExpires < Date.now()) {

      return res.status(400).json({
        message: "OTP expired"
      });
    }

    user.isVerified = true;

    user.otp = null;

    user.otpExpires = null;

    await user.save();

    res.json({
      message: "Email verified successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "OTP verification failed"
    });
  }
};

const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.otp = otp;

    user.otpExpires =
      Date.now() + 10 * 60 * 1000;

    await user.save();

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "Reset Password OTP",

      html: `
        <h2>Password Reset</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
      `
    });

    res.json({
      message: "OTP sent to email"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to send OTP"
    });
  }
};



module.exports = {
  registerUser,
  loginUser
};