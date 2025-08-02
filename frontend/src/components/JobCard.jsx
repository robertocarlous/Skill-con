const JobCard = ({ job }) => {
  const title = job.jobTitle || job.title;
  const description = job.jobDescription || job.description;
  const budget = job.proposedBudget || job.budget;
  const timeline = job.timeline || job.dueDate;
  const location = job.location || "Not specified";

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      <div className="text-sm text-gray-500 mt-2">
        <span>Due: {timeline}</span>
      </div>
      <div className="text-sm text-gray-500 mt-2">
        <span>Location: {location}</span> | <span>Budget: ₦{budget}</span>
      </div>
    </div>
  );
};

export default JobCard;
