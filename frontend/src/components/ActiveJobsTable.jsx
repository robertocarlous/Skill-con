// Active Jobs Table Component

import { ExternalLink, MoreHorizontal } from "lucide-react";





const ActiveJobsTable = ({ activeJobs, onSeeAll }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Active Jobs</h3>
        <button 
          onClick={onSeeAll}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
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
  );
};

export default ActiveJobsTable;