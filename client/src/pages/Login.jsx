import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { toast } from "react-toastify";

import { Eye, EyeOff } from "lucide-react";

import api from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success(
        "Login successful"
      );

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="auth-page">

      {/* Atmosphere */}
      <div className="auth-glow"></div>

      <div className="auth-container">

        {/* Left Side */}
        <div className="auth-left">

          <p className="auth-mini-text">
            ENTER THE EDITORIAL SPACE
          </p>

          <h1 className="auth-heading">
            Welcome Back
          </h1>

          <p className="auth-description">

            Continue crafting
            stories, elegant ideas, and
            immersive digital experiences.

          </p>

        </div>

        {/* Right Side */}
        <div className="auth-panel">

          <h2 className="auth-title">
            Sign In
          </h2>

          <form onSubmit={handleSubmit}>

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
                  placeholder="Enter password"
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

            </div>

            {/* FORGOT PASSWORD */}

            <div className="forgot-wrapper">

              <Link
                to="/forgot-password"
                className="forgot-link"
              >
                Forgot Password?
              </Link>

            </div>

            {/* BUTTON */}

            <button
              className="auth-button"
              disabled={loading}
            >

              {loading
                ? "Signing In..."
                : "Login"}

            </button>

          </form>

          {/* BOTTOM LINK */}

          <p className="auth-bottom-text">

            Don’t have an account?{" "}

            <Link to="/register">
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;