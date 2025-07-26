// src/pages/PreviewJob.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderDashBoard from "../../components/HeaderDashBoard";
import { ArrowLeft } from "lucide-react";
import Modal from "../../components/ModalPostJob";

export default function PreviewJob() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;
  const state = formData || {};

  if (!formData) {
    return <p className="text-center mt-10">No job data to preview.</p>;
  }
  const [showModal, setShowModal] = React.useState(false);
  const handleSaveAndContinue = () => {
    // Logic to save the job post can be added here
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderDashBoard />
      <div className="mt-12 px-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-start text-black"
        >
          <ArrowLeft className="mr-2" size={30} />
        </button>
      </div>
      <div className="w-full max-w-4xl mx-auto pl-[50px] py-4">
        <h2 className="text-4xl font-semibold text-gray-900 mb-8">
          Preview Job Post
        </h2>

        <div className=" p-8 rounded-lg space-y-12">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Job Title:
              </label>
              <div className=" rounded-lg px-4 py-3 text-[#5C5C5C]">
                {state.jobTitle}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Key Skills:
              </label>
              <div className=" px-4 py-3 text-[#5C5C5C]">{state.keySkills}</div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Location:
              </label>
              <div className=" px-4 py-3 text-[#5C5C5C]">{state.location}</div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Proposed Budget:
              </label>
              <div className=" px-4 py-3 text-[#5C5C5C]">
                {state.proposedBudget}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 ">
                Timeline:
              </label>
              <div className="rounded-lg px-4 py-3 text-[#5C5C5C]">
                {state.timeline}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Job Description:
              </label>
              <div className=" rounded-lg px-4 py-3 text-[#5C5C5C]">
                {state.jobDescription}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            className="px-6 py-3 bg-gray-300  text-blue-600 rounded-lg"
            onClick={() => navigate(-1)}
          >
            Edit Job
          </button>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-green-700 transition"
            onClick={handleSaveAndContinue}
          >
            Post Job
          </button>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => {
              handleSaveAndContinue();
              next();
              setShowModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
