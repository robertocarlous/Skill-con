import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import { resendOtp, verifyOtp } from "../../utils/api";

const RESEND_COOLDOWN = 30; // seconds

const VerifyPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [emailLocked, setEmailLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
      setEmailLocked(true);
    }
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [location.state]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");
    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasted[i] || "";
    }
    setCode(newCode);
    const nextIndex = pasted.length < 6 ? pasted.length : 5;
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    if (code.some((digit) => digit === "")) {
      alert("Please enter the full 6-digit code");
      return;
    }
    const otp = code.join("");
    setLoading(true);
    try {
      const data = await verifyOtp(email, otp);
      if (data.success) {
        navigate("/selectrole", { state: { email } });
      } else {
        alert(data.error || "OTP verification failed");
      }
    } catch (err) {
      alert(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    setResendLoading(true);
    try {
      await resendOtp(email);
      alert("A new OTP has been sent to your email.");
      setResendCooldown(RESEND_COOLDOWN);
    } catch (err) {
      alert(err.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Logo />
      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-start p-16 bg-white">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={30} />
        </button>
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your Account
          </h2>
          <p className="text-gray-600 mb-6">
            We've sent a 6-digit code to your email. Please enter the code to
            confirm your account.
          </p>
          <form onSubmit={handleSubmit}>
            {!emailLocked && (
              <div className="mb-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            )}
            <div className="flex space-x-2 mb-6" onPaste={handlePaste}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <button
              type="submit"
              className="bg-[#275DB0] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg text-center"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Continue"}
            </button>
          </form>
          <p className="text-sm text-gray-600 mb-6 mt-4">
            Didn't receive the code?
            <button
              type="button"
              className="font-bold text-blue-600 disabled:text-gray-400 ml-1"
              onClick={handleResendOtp}
              disabled={resendLoading || resendCooldown > 0}
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend code"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
