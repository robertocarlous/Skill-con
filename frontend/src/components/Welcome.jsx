
import { Wallet} from "lucide-react";
            
alert("Please upload a profile photo before continuing.");


// Welcome Section Component
const WelcomeSection = ({ userName, walletBalance }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome {userName}!</h2>
          <p className="text-gray-600">Stay on top of your projects with recent activity.</p>
        </div>
        <div className="text-right">
          <div className="flex items-center text-gray-600 mb-2">
            <Wallet className="w-4 h-4 mr-2" />
            <span className="text-sm">Wallet Balance</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">₦{walletBalance.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection ;