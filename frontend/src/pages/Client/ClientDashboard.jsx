import {
  Briefcase,
  Plus,
  Wallet,
  MoreHorizontal,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

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

const activeJobs = [
  {
    title: "Residential Plumbing Fix",
    artisan: "Emeka Nicholas",
    location: "Lagos - Surulere",
    dueDate: "Jul 20, 2025",
    status: "In progress",
    statusColor: "bg-green-100 text-green-800",
    link: "/",
  },
  {
    title: "Generator Servicing",
    artisan: "Aisha Bello",
    location: "Abuja - Maitama",
    dueDate: "Jul 22, 2025",
    status: "Awaiting your review",
    statusColor: "bg-orange-100 text-orange-800",
  },
  {
    title: "Event Photography",
    artisan: "David Adekunle",
    location: "Lagos - Ikeja",
    dueDate: "Jul 25, 2025",
    status: "Awaiting your review",
    statusColor: "bg-orange-100 text-orange-800",
  },
  {
    title: "New Office Wiring",
    artisan: "Nkechi Okoro",
    location: "Port Harcourt - GRA",
    dueDate: "Aug 01, 2025",
    status: "In progress",
    statusColor: "bg-green-100 text-green-800",
  },
];

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

export default function ClientDashboard() {
  return (
    <div className=" bg-gray-50 min-h-screen mb-10">
      {/* Header */}

      <Header showPostJobButton={true} />

      {/* Welcome Section */}
      <div className=" rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome Jenny!
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column */}

        <div className="lg:col-span-3 space-y-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-4">
            {statsData.map(({ title, count, icon, color }, index) => (
              <div className="block" key={index}>
                <div
                  key={index}
                  className=" min-h-44 bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all hover:shadow-lg"
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
                    <div className="ml-1">
                      <p className="text-sm font-medium text-gray-600">
                        {title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {count}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {quickActions.map(({ title, subtitle, icon, color }, index) => (
                <div className="block" key={index}>
                  <div
                    key={index}
                    className=" w-54 h-40 bg-[#E9EFF7] rounded-md shadow  p-4 text-center border border-gray-100 transition-all hover:shadow-lg"
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

          {/* Active Jobs Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b">
              Active Jobs
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                    <th className="py-3">Job Title</th>
                    <th className="py-3">Artisan</th>
                    <th className="py-3">Location</th>
                    <th className="py-3">Due Date</th>
                    <th className="py-3">Status</th>
                    <th className="py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {activeJobs.map((job, index) => (
                    <tr key={index}>
                      <td className="py-4 text-sm font-medium text-gray-900">
                        {job.title}
                      </td>
                      <td className="py-4 text-sm text-gray-900">
                        {job.artisan}
                      </td>
                      <td className="py-4 text-sm text-gray-500">
                        {job.location}
                      </td>
                      <td className="py-4 text-sm text-gray-500">
                        {job.dueDate}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.statusColor}`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Recent Activities */}
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

          {/* Notifications */}
          <div className="bg-white min-h-66 rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Notifications
              </h3>
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
                        <p className="text-sm font-medium text-gray-900">
                          {text}
                        </p>
                        <p className="text-xs text-gray-600">{detail}</p>
                        <p className="text-xs text-gray-500 mt-1">{time}</p>
                      </div>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
