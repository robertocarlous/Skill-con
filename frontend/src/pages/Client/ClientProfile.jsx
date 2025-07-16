import React, { useState, useRef } from "react";
import { ArrowLeft, User, Upload, ChevronDown } from "lucide-react";
import Modal from "../../components/ModalClient";
import Header from "../../components/Header";

const ClientProfile = ({ next, prev }) => {
  const [showModal, setShowModal] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const fileInputRef = useRef(null);

  const locations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
    "San Antonio, TX",
    "San Diego, CA",
    "Dallas, TX",
    "San Jose, CA",
  ];

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setIsLocationOpen(false);
  };

  const handleContinue = () => {
    if (isFormValid) {
      const profileData = {
        profilePhoto,
        bio,
        location,
      };
      localStorage.setItem("clientProfile", JSON.stringify(profileData));

      alert("Please complete all fields before continuing.");
      return;
    }
    setShowModal(true);
    if (!profilePhoto) {
      alert("Please upload a profile photo.");
      return;
    }
    if (!bio.trim()) {
      alert("Please write a brief professional bio.");
      return;
    }
    if (!location) {
      alert("Please select your location.");
      return;
    }
    alert("Profile completed successfully!");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <Header />

      <div className="max-w-2xl mx-auto px-12 py-8 text-center justify-center items-center bg-white">
        <button
          onClick={prev}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="mr-1" size={30} />
        </button>
         <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Complete Your Client Profile
        </h2>
        <p className="text-gray-600 text-sm">
          Build your professional profile so clients can discover your unique
          skills and experience.
        </p>
      </div>

      <div className="mb-12">
        <h3 className="text-base font-medium mb-6 text-left text-gray-800">
          Upload Profile Photo
        </h3>

        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>
          </div>

          <div className="flex-1">
            <button
              onClick={handleUploadClick}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2 mb-3"
            >
              <Upload className="w-4 h-4" />
              Upload Photo
            </button>
            <p className="text-sm text-gray-600">
              Upload a professional, well-lit headshot where your face is
              clearly visible.
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>

      <div className="mb-12">
        <h3 className="text-base font-medium mb-3 text-left text-gray-800">
          Write a brief professional bio
        </h3>
        <p className="text-sm text-gray-600 mb-4 text-left">
          Highlight your expertise, what makes you stand out, and your approach
          to work.
        </p>

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <button
                    onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 flex items-center justify-between bg-white"
                  >
                    <span className={location ? "text-gray-900" : "text-gray-500"}>
                      {location || "Select Location"}
                    </span>
                    <ChevronDown className="w-60 h-4 text-gray-400" />
                  </button>
                  {showLocationDropdown && (
              <div className="absolute bottom-full right-0 mb-12 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">

                      {locations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setLocation(loc === "Select Location" ? "" : loc);
                            setShowLocationDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
      

      <div className="text-left">
        <button
          onClick={handleContinue}
           disabled={!isFormValid}
          className="bg-blue-500 text-white px-8 py-3 m-10 rounded text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          Continue
        </button>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
    </div>
  );
};

export default ClientProfile;
