import React from "react";
import Logo from "../components/Logo";

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Logo />
      <h1 className="text-3xl font-bold mt-8 mb-4">Welcome to SkillConnect!</h1>
      <p className="text-lg text-gray-700 mb-8">
        You are now logged in. Start exploring jobs, posting projects, or
        managing your profile.
      </p>
      {/* Add navigation buttons or dashboard widgets here as needed */}
    </div>
  );
};

export default Welcome;
