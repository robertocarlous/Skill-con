import { MoreHorizontal } from "lucide-react";

const activeJobs = [
  {
    title: "Residential Plumbing Fix",
    artisan: "Emeka Nicholas",
    location: "Lagos - Surulere",
    dueDate: "Jul 20, 2025",
    status: "In progress",
    statusColor: "bg-green-100 text-green-800",
    link: "/",
  },
  {
    title: "Generator Servicing",
    artisan: "Aisha Bello",
    location: "Abuja - Maitama",
    dueDate: "Jul 22, 2025",
    status: "Awaiting your review",
    statusColor: "bg-orange-100 text-orange-800",
  },
  {
    title: "Event Photography",
    artisan: "David Adekunle",
    location: "Lagos - Ikeja",
    dueDate: "Jul 25, 2025",
    status: "Awaiting your review",
    statusColor: "bg-orange-100 text-orange-800",
  },
  {
    title: "New Office Wiring",
    artisan: "Nkechi Okoro",
    location: "Port Harcourt - GRA",
    dueDate: "Aug 01, 2025",
    status: "In progress",
    statusColor: "bg-green-100 text-green-800",
  },
];

const ActiveJobs = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mx-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b">
        Active Jobs
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
              <th className="py-3">Job Title</th>
              <th className="py-3">Artisan</th>
              <th className="py-3">Location</th>
              <th className="py-3">Due Date</th>
              <th className="py-3">Status</th>
              <th className="py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {activeJobs.map((job, index) => (
              <tr key={index}>
                <td className="py-4 text-sm font-medium text-gray-900">
                  {job.title}
                </td>
                <td className="py-4 text-sm text-gray-900">{job.artisan}</td>
                <td className="py-4 text-sm text-gray-500">{job.location}</td>
                <td className="py-4 text-sm text-gray-500">{job.dueDate}</td>
                <td className="py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.statusColor}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreHorizontal className="w-5 h-5" />
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

export default ActiveJobs;
