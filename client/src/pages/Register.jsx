import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

function Register() {

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/auth/register",
        formData
      );

      toast.success(
        "Registration successful"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (

    <div className="row justify-content-center">

      <div className="col-md-5">

        <div className="card p-4 shadow">

          <h2 className="mb-4 text-center">
            Register
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-3">

              <label className="form-label">
                Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* Email */}
            <div className="mb-3">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* Password */}
            <div className="mb-4">

              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

            {/* Register Button */}
            <button className="btn btn-dark w-100">
              Register
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;