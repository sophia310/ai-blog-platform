import { useState } from "react";

import {
  useLocation,
  useNavigate,
  Link
} from "react-router-dom";

import { toast } from "react-toastify";

import api from "../api/axios";

function ResetPassword() {

  const navigate = useNavigate();

  const location = useLocation();

  const email =
    location.state?.email || "";

  const [otp, setOtp] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post(
        "/auth/reset-password",
        {
          email,
          otp,
          newPassword
        }
      );

      toast.success(
        "Password reset successful"
      );

      setTimeout(() => {

        navigate("/login");

      }, 1500);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Password reset failed"
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

            SECURE RESET

          </p>

          <h1 className="auth-heading">

            Create
            <br />
            A New
            <br />
            Password

          </h1>

          <p className="auth-description">

            Enter the OTP sent to your
            email and create a new
            secure password for your
            Lumina account.

          </p>

        </div>

        {/* RIGHT PANEL */}

        <div className="auth-panel">

          <h2 className="auth-title">

            Reset Password

          </h2>

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="auth-input-group">

              <label>
                EMAIL
              </label>

              <input
                type="email"
                value={email}
                disabled
              />

            </div>

            {/* OTP */}

            <div className="auth-input-group">

              <label>
                OTP
              </label>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* NEW PASSWORD */}

            <div className="auth-input-group">

              <label>
                NEW PASSWORD
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
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
                ? "Resetting..."
                : "Reset Password"}

            </button>

          </form>

          {/* BACK */}

          <p className="auth-bottom-text">

            Back to{" "}

            <Link to="/login">

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;