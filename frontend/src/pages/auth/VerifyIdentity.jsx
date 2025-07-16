import React, { useState } from "react";
import { ArrowLeft,User } from "lucide-react";
import Header from "../../components/Header";


const VerifyIdentity = ( {next,prev }) => {
  const [nin, setNin] = useState("");

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center bg-gray-50">
       <Header />
     
      <div className="flex-1 flex flex-col justify-center items-center p-16 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
          <button
          onClick={prev}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-1" size={30} />
        
        </button>
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
<button
  type="button"
  disabled={nin.length !== 11}
  onClick={(e) => {
    e.preventDefault();
    if (nin.length === 11) {

      next();

    } else {
      alert("Please enter a valid 11-digit NIN.");
    }
  }}
  className={`block w-full text-center ${
    nin.length === 11
      ? "bg-[#275DB0] hover:bg-blue-700"
      : "bg-gray-300 cursor-not-allowed"
  } text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200`}
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

export default VerifyIdentity;
