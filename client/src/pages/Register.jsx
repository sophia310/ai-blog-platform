import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import { toast } from "react-toastify";

import {
  Eye,
  EyeOff
} from "lucide-react";

import api from "../api/axios";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const getPasswordStrength = () => {

    const password =
      formData.password;

    if (password.length < 6)
      return "Weak";

    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      password.length >= 8
    ) {

      return "Strong";
    }

    return "Medium";
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post(
        "/auth/register",
        formData
      );

      toast.success(
        "OTP sent to your email"
      );

      navigate(
        "/verify-otp",
        {
          state: {
            email:
              formData.email
          }
        }
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="auth-page">

      {/* Glow */}
      <div className="auth-glow"></div>

      <div className="auth-container">

        {/* LEFT */}

        <div className="auth-left">

          <p className="auth-mini-text">

            BEGIN YOUR CREATIVE JOURNEY

          </p>

          <h1 className="auth-heading">

            Create
            <br />
            Your Identity

          </h1>

          <p className="auth-description">

            Build your editorial
            presence, publish
            stories, and shape immersive
            digital experiences through
            Lumina.

          </p>

        </div>

        {/* RIGHT */}

        <div className="auth-panel">

          <h2 className="auth-title">
            Register
          </h2>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="auth-input-group">

              <label>
                FULL NAME
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* EMAIL */}

            <div className="auth-input-group">

              <label>
                EMAIL
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="auth-input-group">

              <label>
                PASSWORD
              </label>

              <div className="password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

              {/* PASSWORD STRENGTH */}

              {formData.password && (

                <div
                  className={`password-strength ${getPasswordStrength().toLowerCase()}`}
                >

                  {getPasswordStrength()} Password

                </div>

              )}

            </div>

            {/* BUTTON */}

            <button
              className="auth-button"
              disabled={loading}
            >

              {loading
                ? "Creating Identity..."
                : "Create Account"}

            </button>

          </form>

          {/* BOTTOM */}

          <p className="auth-bottom-text">

            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;