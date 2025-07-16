// Activity Item Component




const ActivityItem = ({ text, time }) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
      <div className="flex-1">
        <p className="text-sm text-gray-900">{text}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;