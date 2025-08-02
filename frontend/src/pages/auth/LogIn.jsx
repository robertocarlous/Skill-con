import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../../components/Logo";
import { loginUser } from "../../utils/api";
import { useToast } from "../../hooks/useToast";
import { auth } from "../../utils/firebase";
import { useUserStore } from "../../store/userStore";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginUser(formData);
      await auth.currentUser.reload();
      const refreshedUser = auth.currentUser;

      useUserStore.getState().setUser({
        ...user,
        firebaseUid: user.uid,
      });
      if (!refreshedUser.emailVerified) {
        navigate("/verify-pending", { state: { email: refreshedUser.email } });
      } else if (!user.role) {
        navigate("/selectrole", { state: { email: refreshedUser.email } });
      } else if (!user.profileCompleted) {
        if (user.role === "client") {
          navigate("/clientprofile");
        } else if (user.role === "artisan") {
          navigate("/artisanprofile");
        } else {
          navigate("/welcome");
        }
      } else if (user.role === "client") {
        navigate("/client-dashboard");
      } else if (user.role === "artisan") {
        navigate("/artisan-dashboard");
      } else {
        navigate("/welcome");
      }
    } catch (err) {
      showToast(err.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        <Logo />
        <div className="flex-1 flex flex-col justify-space between items-start p-16 bg-white">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to SkillConnect
              </h2>
              <p className="text-gray-600">
                Connect with trusted artisans and manage your projects with
                ease.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 bottom-3 transform -translate-y-1/4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-[30%] bg-[#275DB0] hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-center shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="mt-6 text-left">
              <p className="text-sm text-gray-600 font-bold">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#275DB0] hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
