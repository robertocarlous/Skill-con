import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const VerifyPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [emailLocked, setEmailLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
      setEmailLocked(true);
    }
  }, [location.state]);

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
      const res = await fetch("http://localhost:4000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        navigate("/selectrole", { state: { email } });
      } else {
        alert(data.error || "OTP verification failed");
      }
    } catch {
      alert("Network error during OTP verification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Logo />
      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-start p-16 bg-white">
        <ArrowLeft className="mr-1" size={18} />
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
              className="w-full bg-[#275DB0] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg text-center"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
          <p className="text-sm text-gray-600 mb-6 mt-4">
            Didn't receive the code?
            <Link className="font-bold"> Resend code</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
