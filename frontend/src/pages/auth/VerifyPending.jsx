import Logo from "../../components/Logo";
import { auth } from "../../utils/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { ArrowLeft } from "lucide-react";

const actionCodeSettings = {
  url: window.location.origin + "/verify-email-complete",
  handleCodeInApp: true,
};

const VerifyPending = () => {
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);
  const emailVerified = useUserStore((state) => state.emailVerified);
  const navigate = useNavigate();
  const { showToast } = useToast();

  if (!user) {
    navigate("/login");
    return null;
  }
  if (emailVerified) {
    navigate("/verify-email-complete");
    return null;
  }

  const handleResend = async () => {
    setLoading(true);
    try {
      await sendEmailVerification(auth.currentUser, actionCodeSettings);
      showToast("Verification email resent!", "success");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Logo />
      <div className="flex-1 flex flex-col justify-center items-start p-16 bg-white">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center rounded bg-blue-50 text-blue-600 hover:text-blue-800 hover:bg-blue-100 mb-6 transition-colors duration-200 px-2 py-1"
        >
          <ArrowLeft size={30} />
        </button>
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Check your email
          </h2>
          <p className="text-gray-600 mb-6">
            We've sent a verification link to{" "}
            <span className="font-bold text-blue-700">
              {user?.email || auth.currentUser?.email}
            </span>
            .
            <br /> Please click the link in your email to verify your account.
          </p>
          <button
            onClick={handleResend}
            disabled={loading}
            className="bg-[#275DB0] hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-center shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {loading ? "Resending..." : "Resend Verification Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPending;
