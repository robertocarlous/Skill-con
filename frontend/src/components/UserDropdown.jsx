import React, { useRef, useEffect } from "react";
import { ChevronDown, User, Wallet, Settings, LogOut } from "lucide-react";
import { logoutUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({ profileCompleted, open, setOpen }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  const handleOptionClick = async (option) => {
    setOpen(false);
    if (option === "Log Out") {
      await logoutUser();
      navigate("/");
    } else {
      alert(`${option} clicked`);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <ChevronDown className="w-5 h-5 bg-white text-gray-700 ml-1" />
      {open && (
        <div className="absolute right-0 mt-5 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
          {profileCompleted ? (
            <>
              <button
                onClick={() => handleOptionClick("My Profile")}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-900 text-base font-normal"
              >
                <User className="w-5 h-5 text-gray-600" />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => handleOptionClick("My Wallet")}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-900 text-base font-normal"
              >
                <Wallet className="w-5 h-5 text-gray-600" />
                <span>My Wallet</span>
              </button>
              <button
                onClick={() => handleOptionClick("Settings")}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-900 text-base font-normal"
              >
                <Settings className="w-5 h-5 text-gray-600" />
                <span>Settings</span>
              </button>
            </>
          ) : null}
          <button
            onClick={() => handleOptionClick("Log Out")}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 text-base font-semibold"
          >
            <LogOut className="w-5 h-5 text-red-600" />
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
