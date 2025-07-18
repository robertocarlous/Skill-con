import React, { useState } from 'react';
import { Bell, MessageSquare, ChevronDown, User, Wallet, Settings, LogOut } from 'lucide-react';

const HeaderDashBoard = ({ onPostJob }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 py-2 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-blue-600">SkillConnect</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onPostJob}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >Post a new Job</button>
            <button className="p-2 text-gray-600 hover:text-gray-800"><Bell className="w-5 h-5" /></button>
            <button className="p-2 text-gray-600 hover:text-gray-800"><MessageSquare className="w-5 h-5" /></button>
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User className="w-4 h-4 mr-2" /> My Profile
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Wallet className="w-4 h-4 mr-2" /> My Wallet
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-100">
                    <LogOut  className="w-4 h-4 mr-2" /> Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDashBoard;
