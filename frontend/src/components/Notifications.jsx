// Notifications Component
const Notifications = ({ notifications, onViewAll }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        <button 
          onClick={onViewAll}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          View All
          <ExternalLink className="w-4 h-4 ml-1" />
        </button>
      </div>
      
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <NotificationItem 
            key={index} 
            text={notification.text} 
            detail={notification.detail}
            time={notification.time} 
          />
        ))}
      </div>
    </div>
  );
};