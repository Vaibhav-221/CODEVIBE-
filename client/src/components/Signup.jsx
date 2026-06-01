import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API_BASE_URL from "../config/api";
import registerImage from "../assets/registerImage.png";
import PasswordField from "./PasswordField";
import Dropdown from "./common/Dropdown";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: "",
    college: "",
    year: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setResponseMsg("");

    // Validate year selection
    if (!formData.year) {
      setResponseMsg("Please select your year");
      return;
    }

    // Password Match Validation
    if (formData.password !== formData.confirmPassword) {
      setResponseMsg("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        {
          username: formData.username,
          email: formData.email,
          college: formData.college,
          year: formData.year,
          password: formData.password,
        }
      );

      console.log("✅ Signup successful:", response.data);

      if (response.data.success) {
        setResponseMsg(
          response.data.message || "Account created successfully"
        );

        setTimeout(() => {
          navigate("/login", { state: location.state });
        }, 1500);
      } else {
        setResponseMsg(
          response.data.message || "Signup failed"
        );
      }
    } catch (error) {
      console.error(
        "❌ Signup error:",
        error.response?.data || error.message
      );

      setResponseMsg(
        error.response?.data?.message ||
        "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section" id="signup">
      <div className="login-container">

        {/* Left Side Image */}
        <div className="login-image">
          <img src={registerImage} alt="Signup" />
        </div>

        {/* Signup Form */}
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>

            <h1>Create Account</h1>

            {/* Username */}
            <label htmlFor="username">
              USERNAME:
            </label>

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            {/* College Name */}
            <label htmlFor="college">
              COLLEGE NAME:
            </label>

            <input
              type="text"
              id="college"
              name="college"
              placeholder="Enter college name"
              value={formData.college}
              onChange={handleChange}
              required
            />

            {/* Year */}
            <label htmlFor="year">
              YEAR:
            </label>

            <Dropdown
              value={formData.year}
              onChange={(val) => setFormData({ ...formData, year: val })}
              options={["1st Year", "2nd Year", "3rd Year", "4th Year"]}
              placeholder="Select Year"
              style={{ width: "100%" }}
              triggerStyle={{
                padding: "1rem",
                borderRadius: "4px",
                border: "2px solid var(--primary-red)",
                background: "#0f1419",
                color: formData.year ? "var(--text-primary)" : "#666",
                fontSize: "1rem",
                width: "100%",
                textAlign: "left"
              }}
            />

            {/* Email */}
            <label htmlFor="email">
              EMAIL ID:
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Password */}
            <PasswordField
              id="password"
              label="PASSWORD:"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />

            {/* Confirm Password */}
            <PasswordField
              id="confirmPassword"
              label="CONFIRM PASSWORD:"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />

            {/* Submit Button */}
            <button type="submit" disabled={loading}>
              {loading
                ? "CREATING ACCOUNT..."
                : "CREATE ACCOUNT"}
            </button>

            {/* Response Message */}
            {responseMsg && (
              <p
                style={{
                  color: "white",
                  marginTop: "10px",
                }}
              >
                {responseMsg}
              </p>
            )}

            {/* Login Link */}
            <p>
              Already have an account?{" "}
              <Link to="/login" state={location.state}>
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;