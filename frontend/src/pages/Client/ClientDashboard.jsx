import { Wallet } from "lucide-react";
import Header from "../../components/Header";
import StatsGrid from "../../components/StatsGrid";
import ActiveJobs from "../../components/ActiveJobs";
import QuickActions from "../../components/QuickActions";
import RecentActivities from "../../components/RecentActivities";
import Notifications from "../../components/Notifications";
import { useUserStore } from "../../store/userStore";

const ClientDashboard = () => {
  const user = useUserStore((state) => state.user);
  const firstName =
    user?.fullName?.split(" ")[0] || user?.email?.split("@")[0] || "User";

  return (
    <div className=" bg-gray-50 min-h-screen">
      {/* Header */}

      <Header showPostJobButton={true} />

      {/* Welcome Section */}
      <div className=" rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {`Welcome ${firstName}!`}
            </h2>
            <p className="text-gray-600">
              Stay on top of your projects with recent activity.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Wallet Balance
              </span>
            </div>
            <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
              15,000.00
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-5">
          {/* Stats Section */}
          <StatsGrid />

          {/* Quick Actions */}
          <QuickActions />

          {/* Active Jobs Table */}
          <ActiveJobs />
        </div>

        {/* Right Column */}
        <div className="space-y-8 px-3 py-4">
          {/* Recent Activities */}
          <RecentActivities />

          {/* Notifications */}
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
