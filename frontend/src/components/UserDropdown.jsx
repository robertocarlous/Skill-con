import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  User,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    setOpen(false);
    alert(`${option} clicked`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center text-gray-700 hover:text-blue-600 space-x-1"
      >
        <ChevronDown className="w-5 h-5 bg-white" />
      </button>

      {open && (
        <div className="absolute right-0 mt-5 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button
            onClick={() => handleOptionClick("My Profile")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            <User className="w-4 h-4 text-gray-600" />
            My Profile
          </button>
          <button
            onClick={() => handleOptionClick("My Wallet")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
             <Wallet className="w-4 h-4 mr-2 text-gray-600" />
            My Wallet
          </button>
          <button
            onClick={() => handleOptionClick("Settings")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            <Settings className="w-4 h-4 mr-2 text-gray-600" />
            Settings
          </button>
          <button
            onClick={() => handleOptionClick("Log Out")}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2 text-red-600" />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
