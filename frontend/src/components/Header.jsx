import React from "react";
import { User} from "lucide-react";
import UserDropdown from "./UserDropdown";

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-20 bg-white flex items-center justify-between px-6 py-4 shadow">
      <div className="flex items-center">
        <h3 className="text-blue-500 text-3xl font-bold">SkillConnect</h3>
      </div>
      <div className="w-14 h-10 bg-white flex items-center justify-center cursor-pointer">
        <div className="flex flex-row gap-5">
        <User className="w-6 h-5 bg-gray-300 text-gray-200  rounded-full" />
        <UserDropdown/>
          </div>
       </div>
      </header>
  );
};

export default Header;
