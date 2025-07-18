import React from "react";
import { useState } from "react";
import { Eye, EyeOff,User } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api.js';
import { saveAuth } from '../../utils.js';
import Header from "../../components/Header";


const LogIn  = ({ next, prev }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    });

    const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      saveAuth(data.token, data.user); 
      next();
    },

    onError: (error) => {
      alert(error.message);
    }
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     mutation.mutate({ email, password }); 
    console.log("Login attempt:", formData);
  };

  return (
    <div>
       <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Logo />
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

          
          <div className="space-y-6">
          
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


            <button
              type="submit"
              className="w-md bg-[#275DB0] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Log In
            </button>
          </div>

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
    </div>
  );
};

export default LogIn;

    