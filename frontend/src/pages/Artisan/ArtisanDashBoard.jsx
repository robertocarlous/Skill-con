import React from "react";
import Header from "../../components/Header";
// import { useUserStore } from "../../store/userStore";

const ArtisanDashBoard = () => {
  // const setUser = useUserStore((state) => state.setUser);
  // After fetching user data, call setUser(fetchedUser)
  return (
    <div>
      <Header showPostJobButton={true} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Artisan Dashboard</h1>
        <p className="text-lg text-gray-700">
          Welcome to your SkillCon dashboard! Here you will see your jobs,
          stats, and more.
        </p>
      </div>
    </div>
  );
};

export default ArtisanDashBoard;
