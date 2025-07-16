import React, { useState, useRef } from "react";
import Modal from "../../components/Modal";
import {
  Upload as UploadIcon,
  ArrowLeft,
  User,
  X,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const UploadCertifications = ({ prev }) => {
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: " ", status: " ", type: "PDF" },
    { id: 2, name: " ", status: "uploaded", type: "PDF" },
    { id: 3, name: " ", status: "uploaded", type: "PDF" },
  ]);

  const fileInputRef = useRef(null);
  const maxFiles = 3;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    if (uploadedFiles.length >= maxFiles) {
      alert("You can only upload up to 3 files.");
      return;
    }

    const newFiles = files
      .slice(0, maxFiles - uploadedFiles.length)
      .map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        status: "uploading",
        type: file.name.split(".").pop().toUpperCase(),
        size: formatFileSize(file.size),
      }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    setTimeout(() => {
      setUploadedFiles((prev) =>
        prev.map((file) =>
          file.status === "uploading" ? { ...file, status: "uploaded" } : file
        )
      );
    }, 2000);

    event.target.value = "";
  };

  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveAndContinue = () => {
    if (uploadedFiles.length === 0) {
      alert("Please upload at least one certification file.");
      return;
    }
    setShowModal(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const getFileIcon = (type) => {
    return (
      <div className="w-8 h-8 bg-red-500 text-white rounded-sm flex items-center justify-center text-xs font-bold">
        {type}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 justify-center items-center">
      <Header />

      <div className="flex-1 flex flex-col justify-center items-left p-16 bg-white">
        <button
          onClick={prev}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-1" size={30} />
        </button>
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Upload Certifications
        </h2>
        <p className="text-gray-600 text-sm mb-10">
          Add your professional certifications and showcase your best work to
          attract more clients.
        </p>

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-16 mb-10 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={handleUploadClick}
        >
          <div className="flex flex-col items-center">
            <UploadIcon className="w-12 h-12 text-gray-400 mb-5" />
            <p className="text-base font-medium mb-2 text-gray-800">
              Upload files
            </p>
            <p className="text-sm text-gray-600 mb-5">
              Select and upload up to 3 files of your choice
            </p>
            <button className="bg-gray-100 border border-gray-300 px-5 py-2 rounded text-sm text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Upload File
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileUpload}
          className="hidden"
        />
        <div className="space-y-3">
          {uploadedFiles
            .filter((file) => file.status !== "preview") 
            .map((file) => (
              <div
                key={file.id}
                className="w-full flex items-center px-12 py-6 border border-gray-200 rounded bg-white"
              >
                {getFileIcon(file.type)}

                <div className="text-xl text-gray-600">
                  {file.status === "uploading" ? "Uploading..." : "File sent"}
                </div>

                <div className="flex-1 ml-3">
                  <div className="text-sm text-gray-800">{file.name}</div>
                  {file.status === "uploaded" && (
                    <div className="w-full h-1 bg-green-500 rounded-full mt-2"></div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 border border-red-300 rounded hover:bg-red-50 text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        <button
  onClick={(e) => {
    e.preventDefault();

    if (uploadedFiles.length > 0) {
      setShowModal(true); 
    } else {
      alert("Please upload all necessary data.");
    }
  }}
  className="bg-blue-500 w-52 text-white px-6 py-3 rounded text-sm font-medium hover:bg-blue-600 transition-colors mt-5"
>
  Save and Continue
</button>

      </div>
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
  );
};

export default UploadCertifications;
