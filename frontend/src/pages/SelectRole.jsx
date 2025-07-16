import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Briefcase, User } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleContinue = async () => {
    if (!selectedRole) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: selectedRole }),
      });
      const data = await res.json();
      if (res.ok) {
        // Navigate to role-specific dashboard
        if (selectedRole === "client") {
          navigate("/client-dashboard");
        } else if (selectedRole === "artisan") {
          navigate("/artisan-dashboard");
        } else {
          navigate("/welcome");
        }
      } else {
        alert(data.error || "Failed to set role");
      }
    } catch {
      alert("Network error while setting role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Logo />
      {/* Right */}
      <div className="flex-1 flex flex-col justify-space between items-start p-16 bg-white">
        <ArrowLeft className="mr-1" size={18} />
        <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>

        <p className="text-gray-600 mb-6">
          Choose the option that best describes how you'll engage with
          SkillConnect.
        </p>
        <div className="w-md flex flex-col gap-10 ">
          {/* Artisan */}
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
              <h3 className="text-lg font-bold text-gray-800">
                I'm an Artisan
              </h3>
              <p className="text-sm text-gray-500">
                Find jobs, showcase your skills, and get paid securely.
              </p>
            </div>
          </div>

          {/* Client */}
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
            <button
              className="bg-[#275DB0] text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors duration-200"
              onClick={handleContinue}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : `Continue ${
                    selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)
                  }`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelection;
