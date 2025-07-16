import Header from '../../components/Header';
import WelcomeSection from './WelcomeSection';
import StatsGrid from './StatsGrid';
import QuickActions from './QuickActions';
import ActiveJobsTable from './ActiveJobsTable';
import RecentActivities from './RecentActivities';
import Notifications from './Notifications';
import { Briefcase, FileText, CheckCircle, Plus, Eye, CreditCard } from 'lucide-react';



const SkillConnectDashboard = () => {
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

  // Event handlers
  const handlePostJob = () => {
    console.log('Post job clicked');
  };

  const handleActionClick = (actionTitle) => {
    console.log('Action clicked:', actionTitle);
  };

  const handleSeeAllJobs = () => {
    console.log('See all jobs clicked');
  };

  const handleViewAllActivities = () => {
    console.log('View all activities clicked');
  };

  const handleViewAllNotifications = () => {
    console.log('View all notifications clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onPostJob={handlePostJob} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeSection userName="Jenny" walletBalance={150000} />
        
        <StatsGrid statsData={statsData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <QuickActions 
              quickActions={quickActions} 
              onActionClick={handleActionClick}
            />
            
            <ActiveJobsTable 
              activeJobs={activeJobs} 
              onSeeAll={handleSeeAllJobs}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <RecentActivities 
              activities={recentActivities}
              onViewAll={handleViewAllActivities}
            />
            
            <Notifications 
              notifications={notifications}
              onViewAll={handleViewAllNotifications}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillConnectDashboard;