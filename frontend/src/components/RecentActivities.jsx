import { TrendingUp } from "lucide-react";

const recentActivities = [
  {
    text: "You accepted Artisan Nkechi Okoro's application for 'New Office Wiring'",
    time: "5 mins ago",
    link: "/",
  },
  {
    text: "Payment of ₦25,000 for 'Leaking Bathroom Pipe Fix' has been released to Artisan Amina Bello",
    time: "40 mins ago",
    link: "/",
  },
  {
    text: "Artisan Emeka Nnamdi marked 'Residential Plumbing Fix' as complete and awaits your review.",
    time: "20 hours ago",
    link: "/",
  },
];

const RecentActivities = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Activities
        </h3>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
          View All <TrendingUp className="w-4 h-4 ml-1" />
        </button>
      </div>
      <ul className="space-y-6 border-b">
        {recentActivities.map(({ text, time }, index) => (
          <div className="block" key={index}>
            <li key={index} className="relative">
              <div className="relative flex items-start space-x-3 border-b border-gray-200 pb-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">{text}</p>
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

export default RecentActivities;
