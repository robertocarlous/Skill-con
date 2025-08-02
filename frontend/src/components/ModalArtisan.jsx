import React from "react";
import { CheckCircleIcon } from "lucide-react";

const Modal = ({ isOpen, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center z-0">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full flex flex-col justify-center items-center text-center">
        <CheckCircleIcon className="text-blue-700 mb-4" size={40} />
        <h2 className="text-2xl font-bold mb-2 text-blue-700">
          Your Profile is Complete!
        </h2>
        <p className="text-gray-600 mb-6">
          You're all set to discover amazing job opportunities and connect with
          clients. Get ready to showcase your skills!
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
