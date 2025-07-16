import React from "react";
import { CheckCircleIcon } from "lucide-react";

const Modal = ({ isOpen, onClose,onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg px-8 max-w-lg w-full min-h-96 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-700"> 
         <CheckCircleIcon className="block text-center text-blue-700 ml-32 mb-6" size={40} />
        Your Profile is Complete!</h2>
        <p className="text-gray-600 text-center mb-6">
          Your profile is complete, and you're ready to start your first project.
           Find trusted artisans and get things done.
        </p>
        <button
          onClick={onClose ={onConfirm}}

          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
        Continue to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Modal;
