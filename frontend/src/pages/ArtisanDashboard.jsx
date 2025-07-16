import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { auth } from "../firebase";

const ArtisanDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("You must be logged in to view jobs.");
        const idToken = await user.getIdToken();
        const res = await fetch("http://localhost:4000/api/jobs", {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        const data = await res.json();
        if (res.ok) {
          setJobs(data.data.jobs || []);
        } else {
          setError(data.error || "Failed to fetch jobs.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Logo />
      <h1 className="text-3xl font-bold mt-8 mb-4">Welcome, Artisan!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Browse available jobs, showcase your skills, and get paid securely.
      </p>
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Available Jobs</h2>
        {loading ? (
          <div>Loading jobs...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : jobs.length === 0 ? (
          <div>No jobs available.</div>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job._id} className="border rounded p-4">
                <div className="font-bold text-lg">{job.title}</div>
                <div className="text-gray-700 mb-2">{job.description}</div>
                <div className="text-sm text-gray-500">
                  Location: {job.location} | Category: {job.category} | Budget:
                  ₦{job.budget} | Deadline: {job.deadline?.slice(0, 10)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ArtisanDashboard;
