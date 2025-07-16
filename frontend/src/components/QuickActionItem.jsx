const QuickActionItem = ({ title, subtitle, icon, color, onClick }) => (
  <div onClick={onClick} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 cursor-pointer">
    <div className={`p-2 rounded-md ${color} text-white`}>{icon}</div>
    <div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  </div>
);

export default QuickActionItem;
