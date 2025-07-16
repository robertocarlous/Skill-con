import React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SkillConnectLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.emailOrPhone,
        formData.password
      );
      const idToken = await userCredential.user.getIdToken();
      // Fetch user profile to determine role
      const res = await fetch("http://localhost:4000/api/profile", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      console.log("User profile data:", data);
      if (res.ok) {
        // Navigate based on role
        if (data.role === "client") {
          navigate("/client-dashboard");
        } else if (data.role === "artisan") {
          navigate("/artisan-dashboard");
        } else {
          navigate("/selectrole", { state: { email: data.email } });
        }
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      alert(error.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Logo />
      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-space between items-start p-16 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to SkillConnect
            </h2>
            <p className="text-gray-600">
              Connect with trusted artisans and manage your projects with ease.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email or Phone Input */}
            <div>
              <label
                htmlFor="emailOrPhone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email or Phone Number
              </label>
              <input
                type="text"
                id="emailOrPhone"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                placeholder="Enter your email or phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-md bg-[#275DB0] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-left">
            <p className="text-sm text-gray-600 font-bold">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#275DB0] hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillConnectLogin;
