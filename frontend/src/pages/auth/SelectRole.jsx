import React, { useState } from "react";
import { ArrowLeft, Briefcase, User } from "lucide-react";
import Header from "../../components/Header";

const SelectRole= ({ next, prev }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem("selectedRole", selectedRole); 
      next();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
       <Header />

      <div className="flex-1 flex flex-col justify-space between items-start p-16 bg-white">
        <button
          onClick={prev}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-1" size={30} />
          
        </button>

        <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>
        <p className="text-gray-600 mb-6">
          Choose the option that best describes how you'll engage with SkillConnect.
        </p>

        <div className="w-md flex flex-col gap-10">
         
          <div
            onClick={() => setSelectedRole("artisan")}
            className={`flex flex-row gap-6 cursor-pointer border rounded-lg p-6 transition-all ${
              selectedRole === "artisan"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-500"
            }`}
          >
            <Briefcase
              className="text-blue-600 bg-white border border-blue-500 rounded-lg p-4 mt-1"
              size={60}
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-gray-800">I'm an Artisan</h3>
              <p className="text-sm text-gray-500">
                Find jobs, showcase your skills, and get paid securely.
              </p>
            </div>
          </div>

          <div
            onClick={() => setSelectedRole("client")}
            className={`flex flex-row gap-6 cursor-pointer border rounded-lg p-6 transition-all ${
              selectedRole === "client"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-500"
            }`}
          >
            <User
              className="text-blue-600 bg-white border border-blue-500 rounded-lg p-4 mt-1"
              size={60}
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-gray-800">I'm a Client</h3>
              <p className="text-sm text-gray-500 mt-2">
                Post jobs, find skilled artisans, and manage your work.
              </p>
            </div>
          </div>
        </div>

        {selectedRole && (
          <div className="mt-6">
            <button
              onClick={handleContinue}
              className="bg-[#275DB0] text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Continue as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectRole;





































