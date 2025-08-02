import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";
import ModalPost from "../../components/ModalPostJob";
import { useJobStore } from "../../store/jobStore";
import { postJob } from "../../utils/api";

const PreviewJob = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { clearFormData } = useJobStore();
  const formData = location.state;
  const state = formData || {};

  if (!formData) {
    return <p className="text-center mt-10">No job data to preview.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const jobData = {
        jobTitle: formData.jobTitle?.trim(),
        keySkills: formData.keySkills?.trim(),
        location: formData.location?.trim(),
        proposedBudget: Number(formData.proposedBudget),
        timeline: formData.timeline?.trim(),
        jobDescription: formData.jobDescription?.trim(),
      };

      await postJob(jobData);
      clearFormData();
      setShowModal(true);
    } catch (err) {
      console.error("Job post failed:", err);
    }
    setLoading(false);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    navigate("/client-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showPostJobButton={false} />
      <div className="flex-1 md:p-6 bg-[#FCFCFC] w-full">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-15 flex items-start rounded hover:text-blue-800 hover:bg-blue-100 mb-6 transition-colors duration-200 px-2 py-1"
        >
          <ArrowLeft size={30} />
        </button>
        <div className="w-full max-w-2xl mx-auto px-[30px]">
          <h2 className="text-4xl font-semibold text-gray-900 mb-8">
            Preview Job Post
          </h2>

          <div className="rounded-lg space-y-12">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Job Title:
                </label>
                <div className="text-[#5C5C5C]">{state.jobTitle}</div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Key Skills:
                </label>
                <div className="text-[#5C5C5C]">{state.keySkills}</div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Location:
                </label>
                <div className="text-[#5C5C5C]">{state.location}</div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Proposed Budget:
                </label>
                <div className="text-[#5C5C5C]">{state.proposedBudget}</div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 ">
                  Timeline:
                </label>
                <div className="text-[#5C5C5C]">{state.timeline}</div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Job Description:
                </label>
                <div className="text-[#5C5C5C]">{state.jobDescription}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              className="px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-semibold"
              onClick={() => navigate(-1)}
            >
              Edit Job
            </button>
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
            <ModalPost
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={handleModalConfirm}
              jobTitle={formData.jobTitle}
              keySkills={formData.keySkills}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewJob;
