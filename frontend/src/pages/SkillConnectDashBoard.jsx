import React, { useState } from 'react';
import { 
  Bell, 
  MessageSquare, 
  ChevronDown, 
  User, 
  Wallet, 
  Settings, 
  Plus, 
  Eye, 
  FileText, 
  CreditCard,
  ExternalLink,
  MoreHorizontal,
  Calendar,
  Briefcase,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const SkillConnectDashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const statsData = [
    { title: 'Ongoing Jobs', count: 3, icon: <Briefcase className="w-5 h-5" />, color: 'text-green-600' },
    { title: 'New Applications', count: 5, icon: <FileText className="w-5 h-5" />, color: 'text-blue-600' },
    { title: 'Delivered Jobs', count: 2, icon: <CheckCircle className="w-5 h-5" />, color: 'text-orange-600' }
  ];

  const quickActions = [
    { title: 'Post a New Job', subtitle: 'Find skilled help for your project', icon: <Plus className="w-6 h-6" />, color: 'bg-blue-500' },
    { title: 'Track Active Job', subtitle: 'Monitor your ongoing projects', icon: <Eye className="w-6 h-6" />, color: 'bg-gray-600' },
    { title: 'Review Applications', subtitle: 'Check new artisan proposals', icon: <FileText className="w-6 h-6" />, color: 'bg-blue-400' },
    { title: 'Top Up Wallet', subtitle: 'Add funds for your next project', icon: <CreditCard className="w-6 h-6" />, color: 'bg-blue-600' }
  ];

  const activeJobs = [
    { 
      title: 'Residential Plumbing Fix', 
      artisan: 'Emeka Nicholas', 
      location: 'Lagos - Surulere', 
      dueDate: 'Jul 20, 2025', 
      status: 'In progress',
      statusColor: 'bg-green-100 text-green-800'
    },
    { 
      title: 'Generator Servicing', 
      artisan: 'Aisha Bello', 
      location: 'Abuja - Maitama', 
      dueDate: 'Jul 22, 2025', 
      status: 'Awaiting your review',
      statusColor: 'bg-orange-100 text-orange-800'
    },
    { 
      title: 'Event Photography', 
      artisan: 'David Adekunle', 
      location: 'Lagos - Ikeja', 
      dueDate: 'Jul 25, 2025', 
      status: 'Awaiting your review',
      statusColor: 'bg-orange-100 text-orange-800'
    },
    { 
      title: 'New Office Wiring', 
      artisan: 'Nkechi Okoro', 
      location: 'Port Harcourt - GRA', 
      dueDate: 'Aug 01, 2025', 
      status: 'In progress',
      statusColor: 'bg-green-100 text-green-800'
    }
  ];

  const recentActivities = [
    { text: 'You accepted Artisan Nkechi Okoro\'s application for \'New Office Wiring\'', time: '5 mins ago' },
    { text: 'Payment of ₦25,000 for \'Leaking Bathroom Pipe Fix\' has been released to Artisan Amina Bello', time: '40 mins ago' },
    { text: 'Artisan Emeka Nnamdi marked \'Residential Plumbing Fix\' as complete and awaits your review.', time: '20 hours ago' }
  ];

  const notifications = [
    { text: 'New application', detail: 'Plumbing Repair from Emeka Nnamdi.', time: '5 mins ago' },
    { text: 'New application', detail: 'Generator Servicing from Artisan Aisha Bello.', time: '1 hour ago' },
    { text: 'Active Job', detail: 'New Office Wiring is ready for your review.', time: '2 hours ago' },
    { text: 'Wallet Top UP', detail: 'Your wallet was topped up by ₦50,000.', time: '7 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-blue-600">SkillConnect</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Post a new Job
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <Bell className="w-5 h-5" />
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <MessageSquare className="w-5 h-5" />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Wallet className="w-4 h-4 mr-2" />
                      My Wallet
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome Jenny!</h2>
              <p className="text-gray-600">Stay on top of your projects with recent activity.</p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-gray-600 mb-2">
                <Wallet className="w-4 h-4 mr-2" />
                <span className="text-sm">Wallet Balance</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">₦150,000</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-md ${stat.color} bg-opacity-10`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.count}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className={`p-2 rounded-md ${action.color} text-white`}>
                      {action.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Jobs */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Jobs</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  See all
                  <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-3 font-medium">Job Title</th>
                      <th className="pb-3 font-medium">Artisan</th>
                      <th className="pb-3 font-medium">Artisan Location</th>
                      <th className="pb-3 font-medium">Due Date</th>
                      <th className="pb-3 font-medium">Job Status</th>
                      <th className="pb-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeJobs.map((job, index) => (
                      <tr key={index} className="border-t border-gray-100">
                        <td className="py-3 text-sm text-gray-900">{job.title}</td>
                        <td className="py-3 text-sm text-gray-900">{job.artisan}</td>
                        <td className="py-3 text-sm text-gray-600">{job.location}</td>
                        <td className="py-3 text-sm text-gray-600">{job.dueDate}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.statusColor}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
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
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  View All
                  <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  View All
                  <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notification.text}</p>
                      <p className="text-sm text-gray-600">{notification.detail}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillConnectDashboard;