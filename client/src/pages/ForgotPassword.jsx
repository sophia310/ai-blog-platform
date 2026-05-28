import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import { toast } from "react-toastify";

import api from "../api/axios";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post(
        "/auth/forgot-password",
        { email }
      );

      toast.success(
        "OTP sent to your email"
      );

      setTimeout(() => {

        navigate(
          "/reset-password",
          {
            state: { email }
          }
        );

      }, 1200);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to send OTP"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="auth-page">

      {/* ATMOSPHERIC GLOW */}
      <div className="auth-glow"></div>

      <div className="auth-container">

        {/* LEFT SIDE */}

        <div className="auth-left">

          <p className="auth-mini-text">

            ACCOUNT RECOVERY

          </p>

          <h1 className="auth-heading">

            Restore
            <br />
            Access

          </h1>

          <p className="auth-description">

            Enter your email and we’ll
            send you a secure OTP to
            reset your password and
            regain access to Lumina.

          </p>

        </div>

        {/* RIGHT PANEL */}

        <div className="auth-panel">

          <h2 className="auth-title">

            Forgot Password

          </h2>

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="auth-input-group">

              <label>
                EMAIL
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* BUTTON */}

            <button
              className="auth-button"
              disabled={loading}
            >

              {loading
                ? "Sending OTP..."
                : "Send Reset OTP"}

            </button>

          </form>

          {/* BACK */}

          <p className="auth-bottom-text">

            Remembered your password?{" "}

            <Link to="/login">

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;