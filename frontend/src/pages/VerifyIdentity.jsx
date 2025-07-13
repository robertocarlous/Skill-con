import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const VerifyIdentity = () => {
  const [nin, setNin] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Logo />
      {/* Right Panel - NIN Input */}
      <div className="flex-1 flex flex-col justify-center items-start p-16 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Verify Your Identity
          </h2>
          <p className="text-gray-600 mb-6">
            To ensure a safe and trusted community for all users, we require a
            quick identity verification.
          </p>

          {/* Form */}
          <form className="space-y-6">
            <div>
              <label
                htmlFor="nin"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                National Identification Number NIN
              </label>
              <input
                type="text"
                id="nin"
                name="nin"
                value={nin}
                onChange={(e) => setNin(e.target.value)}
                maxLength={11}
                placeholder="Enter your 11-digit NIN e.g. 12345678901"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Continue Link */}
            <Link
              to="/selectrole"
              className={`block w-full text-center ${
                nin.length === 11
                  ? "bg-[#275DB0] hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200`}
              onClick={(e) => {
                if (nin.length !== 11) {
                  e.preventDefault();
                  alert("Please enter a valid 11-digit NIN.");
                }
              }}
            >
              Continue
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyIdentity;
