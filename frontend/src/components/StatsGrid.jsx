import { Briefcase } from "lucide-react";

const statsData = [
  {
    title: "Ongoing Jobs",
    count: 3,
    icon: <Briefcase className="w-5 h-5" />,
    color: "bg-green-600",
    link: "/post-job",
  },
  {
    title: "New Applications",
    count: 5,
    icon: <Briefcase className="w-5 h-5" />,
    color: "bg-blue-600",
    link: "/post-job",
  },
  {
    title: "Delivered Jobs",
    count: 2,
    icon: <Briefcase className="w-5 h-5" />,
    color: "bg-yellow-600",
    link: "/post-job",
  },
];

const StatsGrid = () => {
  return (
    <div className="lg:col-span-3 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-4">
        {statsData.map(({ title, count, icon, color }, index) => (
          <div className="block" key={index}>
            <div
              key={index}
              className=" min-h-40 bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all hover:shadow-lg"
            >
              <div className="flex flex-col items-left justify-center">
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 ${color.replace(
                      "text-",
                      "bg-"
                    )} bg-opacity-20 rounded-lg flex items-center justify-center`}
                  >
                    {icon}
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-sm font-medium text-gray-600">{title}</p>
                  <p className="text-3xl font-bold text-gray-900">{count}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;
