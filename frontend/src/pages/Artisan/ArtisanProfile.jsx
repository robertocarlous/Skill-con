import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  Upload,
  User,
  ChevronDown,
  X,
  FileText,
} from "lucide-react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/ModalArtisan";
import { updateArtisanProfile } from "../../utils/api";
import { getAuth } from "firebase/auth";
import { useUserStore } from "../../store/userStore";

const ArtisanProfile = () => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const fileInputRef = useRef(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const experienceYears = [
    "Less than 1 year",
    "1-3 years",
    "4-6 years",
    "7-10 years",
    "10+ years",
  ];
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);
  const [skill, setSkill] = useState("");
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [certificationFiles, setCertificationFiles] = useState([]);
  const fileInputRefCert = useRef(null);
  const maxFiles = 3;

  // Add city-state mapping
  const CITY_STATE_MAP = {
    Lagos: "Lagos",
    Abuja: "FCT",
    "Port Harcourt": "Rivers",
    Kano: "Kano",
    Ibadan: "Oyo",
    "Benin City": "Edo",
    Enugu: "Enugu",
    Jos: "Plateau",
    Abeokuta: "Ogun",
    Owerri: "Imo",
    Akure: "Ondo",
    Ilorin: "Kwara",
    Uyo: "Akwa Ibom",
    Calabar: "Cross River",
    Kaduna: "Kaduna",
    Onitsha: "Anambra",
    Warri: "Delta",
    Maiduguri: "Borno",
    Makurdi: "Benue",
    Asaba: "Delta",
    "Ado Ekiti": "Ekiti",
  };
  const NIGERIAN_CITIES = Object.keys(CITY_STATE_MAP);

  const setUser = useUserStore((state) => state.setUser);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhotoFile(file);
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

  const handleFileUploadCert = (event) => {
    const files = Array.from(event.target.files);
    if (certificationFiles.length + files.length > maxFiles) {
      alert("You can only upload up to 3 files.");
      return;
    }
    setCertificationFiles((prev) => [
      ...prev,
      ...files.slice(0, maxFiles - prev.length),
    ]);
    event.target.value = "";
  };
  const removeFile = (idx) => {
    setCertificationFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleProfileContinue = () => {
    if (!profilePhotoFile) {
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
    if (!skill.trim()) {
      alert("Please enter your skill.");
      return;
    }
    if (!yearsOfExperience) {
      alert("Please select your years of experience.");
      return;
    }
    setStep(2);
  };
  const handleFinalSubmit = async () => {
    if (certificationFiles.length === 0) {
      alert("Please upload at least one certification file.");
      return;
    }
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      const idToken = await user.getIdToken();
      const updatedUser = await updateArtisanProfile({
        profileImage: profilePhotoFile,
        bio,
        location,
        skill,
        yearsOfExperience,
        certifications: certificationFiles,
        idToken,
      });
      setUser(updatedUser.user);
      setShowModal(true);
    } catch (err) {
      alert(err.message || "Profile update failed");
    }
  };
  const isFormValid =
    profilePhotoFile &&
    bio.trim() &&
    location &&
    skill.trim() &&
    yearsOfExperience;

  return (
    <div className="min-h-screen bg-gray-50 justify-center items-center">
      <Header showPostJobButton={false} />
      <div className="max-w-2xl mx-auto  px-6 py-8 bg-white text-blue-600 hover:text-blue-800">
        <button
          onClick={() => (step === 1 ? navigate(-1) : setStep(1))}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-1" size={30} />
        </button>
        {step === 1 ? (
          <>
            {/* Profile Step */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Complete Your Artisan Profile
              </h2>
              <p className="text-gray-600">
                Build your professional profile so clients can discover your
                unique skills and experience.
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
                  <span
                    className={location ? "text-gray-900" : "text-gray-500"}
                  >
                    {location || "Select Location"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {showLocationDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {NIGERIAN_CITIES.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setLocation(city);
                          setShowLocationDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
                      >
                        {city} ({CITY_STATE_MAP[city]})
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
                  onClick={() =>
                    setShowExperienceDropdown(!showExperienceDropdown)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 flex items-center justify-between bg-white"
                >
                  <span
                    className={
                      yearsOfExperience ? "text-gray-900" : "text-gray-500"
                    }
                  >
                    {yearsOfExperience || "Select Years"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {showExperienceDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {experienceYears.map((exp) => (
                      <button
                        key={exp}
                        onClick={() => {
                          setYearsOfExperience(
                            exp === "Select Years" ? "" : exp
                          );
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

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill
              </label>
              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="e.g. Plumbing, Electrical"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleProfileContinue}
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
          </>
        ) : (
          <>
            {/* Certification Step */}
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Upload Certifications
            </h2>
            <p className="text-gray-600 text-sm mb-10">
              Add your professional certifications and showcase your best work
              to attract more clients.
            </p>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-16 mb-10 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => fileInputRefCert.current?.click()}
            >
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400 mb-5" />
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
              ref={fileInputRefCert}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileUploadCert}
              className="hidden"
            />
            <div className="space-y-3">
              {certificationFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="w-full flex items-center px-12 py-6 border border-gray-200 rounded bg-white"
                >
                  <div className="w-8 h-8 bg-red-500 text-white rounded-sm flex items-center justify-center text-xs font-bold">
                    {file.name.split(".").pop().toUpperCase()}
                  </div>
                  <div className="text-xl text-gray-600">File ready</div>
                  <div className="flex-1 ml-3">
                    <div className="text-sm text-gray-800">{file.name}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => removeFile(idx)}
                      className="p-1 border border-red-300 rounded hover:bg-red-50 text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleFinalSubmit}
              className="bg-blue-500 w-52 text-white px-6 py-3 rounded text-sm font-medium hover:bg-blue-600 transition-colors mt-5"
            >
              Save and Continue
            </button>
          </>
        )}
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            navigate("/artisan-dashboard");
          }}
          onConfirm={() => {
            setShowModal(false);
            navigate("/artisan-dashboard");
          }}
        />
      </div>
    </div>
  );
};

export default ArtisanProfile;
