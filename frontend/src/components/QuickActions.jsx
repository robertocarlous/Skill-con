import { Briefcase, Plus, CreditCard, Wallet } from "lucide-react";

const quickActions = [
  {
    title: "Post a New Job",
    subtitle: "Find skilled help for your project",
    icon: <Plus className="w-6 h-6 text-white" />,
    color: "bg-blue-500",
    link: "/",
  },
  {
    title: "Track Active Job",
    subtitle: "Monitor your ongoing projects",
    icon: <Briefcase className="w-6 h-6 text-white" />,
    color: "bg-blue-500",
    link: "/",
  },
  {
    title: "Review Applications",
    subtitle: "Check new artisan proposals",
    color: "bg-blue-500",
    icon: <CreditCard className="w-6 h-6 text-white" />,
    link: "/",
  },
  {
    title: "Top Up Wallet",
    subtitle: "Add funds for your next project",
    color: "bg-blue-600",
    icon: <Wallet className="w-6 h-6 text-white" />,
    link: "/",
  },
];

const QuickActions = () => {
  return (
    <div className="rounded-lg p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {quickActions.map(({ title, subtitle, icon, color }, index) => (
          <div className="block" key={index}>
            <div
              key={index}
              className=" w-54 h-30 bg-[#E9EFF7] rounded-md shadow  p-4 text-center border border-gray-100 transition-all hover:shadow-lg"
            >
              <div
                className={`w-14 h-14 ${color} rounded-full flex items-center justify-center mx-auto mb-3`}
              >
                {icon}
              </div>
              <h4 className="text-md font-semibold text-gray-900 mb-1">
                {title}
              </h4>
              <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
