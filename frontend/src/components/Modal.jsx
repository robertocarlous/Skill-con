import React from "react";
import { CheckCircleIcon } from "lucide-react";

const Modal = ({isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center z-0">
      <div className="bg-white rounded-lg shadow-lg px-8 max-w-lg w-full min-h-96 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          <CheckCircleIcon className="block text-center ml-32 mb-4 " size={40} />
          Your  Profile is Complete!</h2>
        <p className="text-gray-600 mb-6">
    You're all set to discover amazing job opportunities and connect with clients.
     Get ready to showcase your skills!
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
