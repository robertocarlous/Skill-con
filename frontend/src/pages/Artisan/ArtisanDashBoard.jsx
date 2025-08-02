import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../store/userStore";
import { useJobStore } from "../../store/jobStore";
import { getJobs } from "../../utils/api";
import Header from "../../components/Header";
import JobCard from "../../components/JobCard";

const fetchJobs = async () => {
  const response = await getJobs();
  return response.data.jobs;
};

const ArtisanDashboard = () => {
  const user = useUserStore((state) => state.user);
  const userId = user?.uid;
  const setJobs = useJobStore((state) => state.setJobs);

  const {
    data: jobs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    enabled: !!userId,
    onSuccess: (fetchedJobs) => setJobs(fetchedJobs),
    staleTime: 1000 * 60 * 5,
  });

  const availableJobs = jobs.filter((job) => job.artisan !== userId);

  return (
    <div>
      <Header showPostJobButton={false} />
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Artisan Dashboard</h1>
        <p className="text-lg text-gray-700">
          Welcome to your SkillCon dashboard! Here you will see your jobs,
          stats, and more.
        </p>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
        <h2 className="text-2xl font-semibold mb-6">Available Jobs</h2>

        {isLoading ? (
          <p>Loading jobs...</p>
        ) : isError ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : availableJobs.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {availableJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No available jobs at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default ArtisanDashboard;
