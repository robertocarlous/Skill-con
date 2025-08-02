import { useNavigate } from "react-router-dom";

const HeaderLandingPage = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full sticky top-0 z-20 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-blue-500 text-2xl font-semibold">SkillConnect</h1>

          <button
            onClick={() => navigate("/signup")}
            className="bg-[#275DB0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderLandingPage;
