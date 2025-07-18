import React, { useState, useRef } from "react";
import { ArrowLeft, Upload, User, ChevronDown, X } from "lucide-react";
import Header from "../../components/Header";

const ArtisanProfile = ({ next, prev }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [experience, setExperience] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);
  const fileInputRef = useRef(null);

  const locations = [
    "Select Location",
    "Lagos",
    "Abuja",
    "Port Harcourt",
    "Kano",
    "Ibadan",
    "Benin City",
    "Kaduna",
    "Enugu",
    "Onitsha",
    "Warri",
  ];

  const states = [
    "Select State",
    "Lagos State",
    "Abuja FCT",
    "Rivers State",
    "Kano State",
    "Oyo State",
    "Edo State",
    "Kaduna State",
    "Enugu State",
    "Anambra State",
    "Delta State",
  ];

  const experienceYears = [
    "Select Years",
    "0-1 years",
    "1-2 years",
    "2-5 years",
    "5-10 years",
    "10+ years",
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

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGoBack = () => {
    prev();
  };

  const handleContinue = () => {
    if (isFormValid) {
      const profileData = {
        profilePhoto,
        bio,
        location,
        state,
        experience,
      };
      console.log("Profile data:", profileData);
      next();
    } else {
      alert("Please fill in all fields.");
    }
  };
  const isFormValid = bio.trim() && location && state && experience;

  return (
    <div className="min-h-screen bg-gray-50 justify-center items-center">
      <Header />

      <div className="max-w-2xl mx-auto  px-6 py-8 bg-white text-blue-600 hover:text-blue-800">
        <button
          onClick={prev}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-1" size={30} />
        </button>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Complete Your Artisan Profile
          </h2>
          <p className="text-gray-600">
            Build your professional profile so clients can discover your unique
            skills and experience.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upload Profile Photo
          </h3>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              {profilePhoto && (
                <button
                  onClick={handleRemovePhoto}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div>
              <button
                onClick={handleUploadClick}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Photo</span>
              </button>
              <p className="text-sm text-gray-500 mt-1">
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

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Write a brief professional bio
          </h3>
          <p className="text-gray-600 mb-4">
            Highlight your expertise, what makes you stand out, and your
            approach to work.
          </p>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {showLocationDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience
            </label>
            <button
              onClick={() => setShowExperienceDropdown(!showExperienceDropdown)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 flex items-center justify-between bg-white"
            >
              <span className={experience ? "text-gray-900" : "text-gray-500"}>
                {experience || "Select Years"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {showExperienceDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {experienceYears.map((exp) => (
                  <button
                    key={exp}
                    onClick={() => {
                      setExperience(exp === "Select Years" ? "" : exp);
                      setShowExperienceDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    {exp}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <button
            onClick={() => setShowStateDropdown(!showStateDropdown)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 flex items-center justify-between bg-white"
          >
            <span className={state ? "text-gray-900" : "text-gray-500"}>
              {state || "Select State"}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          {showStateDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {states.map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setState(st === "Select State" ? "" : st);
                    setShowStateDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!isFormValid}
            className={`px-8 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile;
