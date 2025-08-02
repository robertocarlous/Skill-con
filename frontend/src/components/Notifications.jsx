import { TrendingUp } from "lucide-react";

const notifications = [
  {
    text: "New application",
    detail: "Plumbing Repair from Emeka Nnamdi.",
    time: "5 mins ago ",
    link: "/",
  },
  {
    text: "New application",
    detail: "Generator Servicing from Artisan Aisha Bello.",
    time: "1 hour ago",
    link: "/",
  },
  {
    text: "Active Job",
    detail: "New Office Wiring is ready for your review.",
    time: "2 hours ago",
    link: "/",
  },
  {
    text: "Wallet Top UP",
    detail: "Your wallet was topped up by ₦50,000.",
    time: "7 hours ago",
    link: "/",
  },
];

const Notifications = () => {
  return (
    <div className="bg-white min-h-66 rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
          View All <TrendingUp className="w-4 h-4 ml-1" />
        </button>
      </div>
      <ul className="space-y-4 border-b">
        {notifications.map(({ text, detail, time }, index) => (
          <div className="block" key={index}>
            <li key={index} className="relative">
              <div className="relative flex items-start border-b border-gray-200">
                <div className="relative"></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{text}</p>
                  <p className="text-xs text-gray-600">{detail}</p>
                  <p className="text-xs text-gray-500 mt-1">{time}</p>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
