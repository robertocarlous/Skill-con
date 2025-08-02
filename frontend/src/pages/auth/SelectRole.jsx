import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Briefcase, User } from "lucide-react";
import Logo from "../../components/Logo";
import { updateUserRole } from "../../utils/api";
import { useUserStore } from "../../store/userStore";
import { useToast } from "../../hooks/useToast";
import { getProfile } from "../../utils/api";

const SelectRole = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleContinue = async () => {
    if (!selectedRole) return;
    setLoading(true);
    try {
      await updateUserRole(selectedRole);
      const userData = await getProfile();
      useUserStore.getState().setUser(userData);
      if (selectedRole === "client") {
        navigate("/clientprofile");
      } else if (selectedRole === "artisan") {
        navigate("/artisanprofile");
      } else {
        navigate("/welcome");
      }
    } catch (err) {
      showToast(err.message || "Failed to set role", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Logo />
      {/* Right */}
      <div className="flex-1 flex flex-col justify-space between items-start px-16 py-8 bg-white">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center rounded bg-blue-50 text-blue-600 hover:text-blue-800 hover:bg-blue-100 mb-6 transition-colors duration-200 px-2 py-1"
        >
          <ArrowLeft size={30} />
        </button>
        <h2 className="text-2xl font-bold mb-5">Select Your Role</h2>

        <p className="text-gray-600 mb-6">
          Choose the option that best describes how you'll engage with
          SkillConnect.
        </p>
        <div className="w-md flex flex-col gap-6 ">
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
              className="bg-[#275DB0] text-white py-3 px-4 rounded hover:bg-blue-700 font-semibold transition-colors duration-200"
              onClick={handleContinue}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : `Continue as ${
                    selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)
                  }`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectRole;
