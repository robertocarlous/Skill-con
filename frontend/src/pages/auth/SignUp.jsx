import React, { useState } from "react";
import { Eye, EyeOff, ArrowLeft,User } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";



const SignUp = ({ next}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
   e.preventDefault();
if (formData.password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }
 console.log("Sign up attempt:", formData);
    next(); 
  };

return(
<div className="min-h-screen  flex flex-col justify-center items-center bg-gray-50">
         <Header />
       
      <div className="flex-1 flex flex-col md:flex-row gap-5">
        <div className="flex-1 flex flex-col justify-between items-start p-16 md:p-16 bg-white">
          <div className="w-full max-w-full">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
              <ArrowLeft className="mr-2" size={30} />
            </button>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Started on SkillConnect
            </h2>
            <p className="text-gray-600 mb-6">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-[#275DB0] hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Log In
              </Link>
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
            
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-enter your password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-52 bg-[#275DB0] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;





















/*
import React, { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const StepSignUp = ({ next,prev }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
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
if (formData.password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }
 console.log("Sign up attempt:", formData);

    // You can add validation here if needed
    next(); // Go to the next step
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Right Panel - Sign Up Form 
      <div className="flex-1 flex flex-col justify-between items-start p-14 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              <button
                onClick= {prev} className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
              <ArrowLeft className="mr-1" size={20} />
                Back
              </button>
              Get Started on SkillConnect
            </h2>
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-[#275DB0] hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Log In
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name 
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Email or Phone 
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Password 
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
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}

                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password 
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Continue Button 
            <button
              type="submit"
              className="w-full bg-[#275DB0] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      </div>
  );
};

export default StepSignUp;
*/
