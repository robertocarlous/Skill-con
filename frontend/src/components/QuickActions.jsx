import QuickActionItem from './QuickActionItem';


const QuickActions = ({ quickActions, onActionClick }) => (
  <div className="bg-white rounded-lg p-6 border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {quickActions.map((action, index) => (
        <QuickActionItem key={index} {...action} onClick={() => onActionClick(action.title)} />
      ))}
    </div>
  </div>
);

export default QuickActions;
