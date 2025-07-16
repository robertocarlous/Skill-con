import React, { useState } from "react";
import SignUp from "./auth/SignUp";
import VerifyPage from "./auth/VerifyPage";
import VerifyIdentity from "./auth/VerifyIdentity";
import SelectRole from "./auth/SelectRole";
import ArtisanProfile from "./Artisan/ArtisanProfile";
import UploadCertifications from "./Artisan/UploadCertifications";
import ClientProfile from "./Client/ClientProfile";


const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const selectedRole = localStorage.getItem("selectedRole");

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const steps = [
    <SignUp key="signup" next={next} prev={prev} />,
    <VerifyPage key="verifypage" next={next} prev={prev} />,
    <VerifyIdentity key="verifyid" next={next} prev={prev} />,
    <SelectRole key="role" next={next} prev={prev} />,
    selectedRole === "client"
      ? <ClientProfile key="client" next={next} prev={prev} />
      : <ArtisanProfile key="artisan" next={next} prev={prev} />,
    selectedRole === "artisan" && (
      <UploadCertifications key="certs" next={next} prev={prev} />
    ),
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center transition-all duration-500 ease-in-out transform">
      <div className="w-full max-w-full bg-white shadow-lg rounded-lg">
        {steps[step]}
      </div>
    </div>
  );
};

export default MultiStepForm;
