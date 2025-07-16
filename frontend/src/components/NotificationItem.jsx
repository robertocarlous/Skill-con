// Notification Item Component


const NotificationItem = ({ text, detail, time }) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{text}</p>
        <p className="text-sm text-gray-600">{detail}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
};

export default NotificationItem;