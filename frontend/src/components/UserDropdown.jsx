import React, { useState, useRef , useEffect} from "react";
import { ChevronDown, User, Wallet, Settings, LogOut } from "lucide-react";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600" />
        </div>
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <a
            href="#"
            onClick={() => handleOptionClick("My Profile")}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <User className="w-4 h-4 mr-2" /> My Profile
          </a>
          <a
            href="#"
            onClick={() => handleOptionClick("My Wallet")}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Wallet className="w-4 h-4 mr-2" /> My Wallet
          </a>
          <a
            href="#"
            onClick={() => handleOptionClick("Settings")}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Settings className="w-4 h-4 mr-2" /> Settings
          </a>
          <a
            href="#"
            onClick={() => handleOptionClick("Logout")}
            className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-100"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </a>
        </div>
      )}
    </div>
  );
};
export default UserDropdown;
