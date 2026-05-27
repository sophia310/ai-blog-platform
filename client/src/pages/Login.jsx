import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      }, 1500);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (

    <div className="row justify-content-center">

      <div className="col-md-5">

        <div className="card p-4 shadow">

          <h2 className="mb-4 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit}>

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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

            {/* Login Button */}
            <button className="btn btn-dark w-100">
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;