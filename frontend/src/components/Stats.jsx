const StatsCard = ({ title, count, icon, color }) => (
  <div className="bg-white rounded-lg p-6 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-md ${color} bg-opacity-10`}>
        <div className={color}>{icon}</div>
      </div>
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-2">{count}</div>
    <div className="text-sm text-gray-600">{title}</div>
  </div>
);

export default StatsCard;
