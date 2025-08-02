import { CheckCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ModalPost = ({ isOpen, onClose, jobTitle, keySkills }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleContinue = () => {
    onClose();
    navigate("/client-dashboard");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full flex flex-col justify-center items-center text-center">
        <CheckCircleIcon className="text-blue-700 mb-4" size={40} />
        <h2 className="text-2xl font-bold mb-2 text-blue-700">
          Your Job Post is Live!
        </h2>
        <p className="text-gray-600 mb-1">
          <strong>Title:</strong> {jobTitle}
        </p>
        <p className="text-gray-600 mb-6">
          <strong>Required Skills:</strong> {keySkills}
        </p>
        <p className="text-gray-600 mb-6">
          Your job post has been successfully published on{" "}
          <strong>SkillConnect</strong>.
        </p>
        <button
          onClick={handleContinue}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ModalPost;
