import React, { useState } from "react";
import { Bell, MessageSquare } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { useUserStore } from "../store/userStore";

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp&f=y";

const Header = ({ showPostJobButton, onPostJob }) => {
  const user = useUserStore((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <header className="w-full sticky top-0 z-20 bg-white flex items-center justify-between px-6 py-4 shadow">
      <div className="flex items-center">
        <h3 className="text-blue-500 text-3xl font-bold">SkillConnect</h3>
      </div>
      <div className="flex items-center gap-5">
        {showPostJobButton && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            onClick={onPostJob}
          >
            Post a new Job
          </button>
        )}
        {user?.profileCompleted && (
          <>
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <MessageSquare className="w-5 h-5" />
            </button>
          </>
        )}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setDropdownOpen((v) => !v)}
        >
          <img
            src={user?.profileImage || DEFAULT_AVATAR}
            alt="User"
            className="w-8 h-8 rounded-full object-cover bg-gray-200"
          />
          <UserDropdown
            profileCompleted={user?.profileCompleted}
            open={dropdownOpen}
            setOpen={setDropdownOpen}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
