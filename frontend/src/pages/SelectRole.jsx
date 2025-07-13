import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Briefcase, User } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Logo />
      {/* Right Panel - Role Selection Form */}
      <div className="flex-1 flex flex-col justify-space between items-start p-16 bg-white">
        <ArrowLeft className="mr-1" size={18} />
        <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>

        <p className="text-gray-600 mb-6">
          Choose the option that best describes how you'll engage with
          SkillConnect.
        </p>
        <div className="w-md flex flex-col gap-10 ">
          {/* Designer Option */}
          <div
            onClick={() => setSelectedRole("designer")}
            className={`flex flex-row gap-6 cursor-pointer border rounded-lg p-6 transition-all ${
              selectedRole === "designer"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-500"
            }`}
          >
            {/* Icon */}
            <Briefcase
              className="text-blue-600 bg-white border border-blue-500 rounded-lg p-4 mt-1"
              size={60}
            />

            {/* Text Column */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-gray-800">
                I'm an Artisan
              </h3>
              <p className="text-sm text-gray-500">
                Find jobs, showcase your skills, and get paid securely.
              </p>
            </div>
          </div>

          {/* Client Option */}
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
                Find jobs, showcase your skills, and get paid securely.
              </p>
            </div>
          </div>
        </div>

        {selectedRole && (
          <div className="mt-6">
            <Link
              to="/"
              className="bg-[#275DB0] text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors duration-200"
              onClick={() => alert(`You selected: ${selectedRole}`)}
            >
              Continue{" "}
              {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelection;
