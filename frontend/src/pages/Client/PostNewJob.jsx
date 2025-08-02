import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useJobStore } from "../../store/jobStore";

const PostNewJob = () => {
  const postJobStore = useJobStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    postJobStore.formData || {
      jobTitle: "",
      keySkills: "",
      location: "",
      proposedBudget: "",
      timeline: "",
      jobDescription: "",
    }
  );

  useEffect(() => {
    if (postJobStore.formData) {
      setFormData(postJobStore.formData);
    }
  }, [postJobStore.formData]);

  const updateFormData = (data) => {
    setFormData(data);
    postJobStore.setFormData(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      jobTitle,
      keySkills,
      location,
      proposedBudget,
      timeline,
      jobDescription,
    } = formData;

    if (
      !jobTitle.trim() ||
      !keySkills.trim() ||
      !location.trim() ||
      !proposedBudget ||
      !timeline.trim() ||
      !jobDescription.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    postJobStore.setFormData(formData);
    navigate("/preview-post", { state: formData });
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
            Post a New Job
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Enter job title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Skills
                </label>
                <select
                  name="keySkills"
                  value={formData.keySkills}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select a skill</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Barber">Barber</option>
                  <option value="Tailor">Tailor</option>
                  <option value="Painter">Painter</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Hair Stylist">Hair Stylist</option>
                  <option value="Mechanic">Mechanic</option>
                  <option value="Welder">Welder</option>
                  <option value="Mason">Mason</option>
                  <option value="Gardener">Gardener</option>
                  <option value="Chef">Chef</option>
                  <option value="Cleaner">Cleaner</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Location</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Port Harcourt">Port Harcourt</option>
                  <option value="Ibadan">Ibadan</option>
                  <option value="Kano">Kano</option>
                  <option value="Enugu">Enugu</option>
                  <option value="Owerri">Owerri</option>
                  <option value="Benin City">Benin City</option>
                  <option value="Calabar">Calabar</option>
                  <option value="Abeokuta">Abeokuta</option>
                  <option value="Ilorin">Ilorin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proposed Budget
                </label>
                <input
                  type="number"
                  name="proposedBudget"
                  value={formData.proposedBudget}
                  onChange={handleInputChange}
                  placeholder="₦ e.g. 10,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline
                </label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  placeholder="e.g. 2 weeks"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                rows={5}
                placeholder="Describe the job..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              ></textarea>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Preview Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostNewJob;
