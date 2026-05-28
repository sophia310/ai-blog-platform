import { useState } from "react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import { toast } from "react-toastify";

import api from "../api/axios";

function VerifyOtp() {

  const navigate = useNavigate();

  const location = useLocation();

  const email =
    location.state?.email;

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleVerify = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post(
        "/auth/verify-otp",
        {
          email,
          otp
        }
      );

      toast.success(
        "Email verified successfully"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Verification failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="auth-page">

      {/* ATMOSPHERIC GLOW */}
      <div className="auth-glow"></div>

      <div className="otp-container">

        <div className="auth-panel otp-panel">

          <p className="auth-mini-text text-center">

            EMAIL VERIFICATION

          </p>

          <h1 className="otp-heading">

            Verify Your Email

          </h1>

          <p className="otp-description">

            We sent a 6-digit OTP to

            <br />

            <span>
              {email}
            </span>

          </p>

          <form onSubmit={handleVerify}>

            {/* OTP INPUT */}

            <div className="auth-input-group">

              <label>
                OTP CODE
              </label>

              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                  )
                }
                maxLength={6}
                required
                className="otp-input"
              />

            </div>

            {/* BUTTON */}

            <button
              className="auth-button"
              disabled={loading}
            >

              {loading
                ? "Verifying..."
                : "Verify Email"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default VerifyOtp;