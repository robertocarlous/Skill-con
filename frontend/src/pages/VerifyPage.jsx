import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const VerifyPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

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

  const handleSubmit = () => {
    if (code.every((digit) => digit !== "")) {
      // Redirect after successful entry
      navigate("/verifyidentity");
    } else {
      alert("Please enter the full 6-digit code");
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
            We've sent a 6-digit code to skillconnect@gmail.com Please enter
            code to confirm your account.
          </p>

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

          <p className="text-sm text-gray-600 mb-6">
            Didn't receive the code?
            <Link className="font-bold"> Resend code</Link>
          </p>
          <Link
            to="/verifyidentity"
            className="w-md bg-[#275DB0] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg text-center block"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
