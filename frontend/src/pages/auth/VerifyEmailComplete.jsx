import { useEffect } from "react";
import Logo from "../../components/Logo";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { applyActionCode } from "firebase/auth";
import { useUserStore } from "../../store/userStore";
import { useToast } from "../../hooks/useToast";

const VerifyEmailComplete = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const oobCode = searchParams.get("oobCode");
    console.log("OOB Code:", oobCode);
    if (!auth.currentUser) {
      showToast("Please log in to complete verification.", "info");
      navigate("/login");
      return;
    }
    if (oobCode) {
      applyActionCode(auth, oobCode)
        .then(async () => {
          await auth.currentUser.reload();
          const user = auth.currentUser;
          useUserStore.getState().setUser({
            email: user.email,
            fullName: user.displayName,
            firebaseUid: user.uid,
            emailVerified: user.emailVerified,
          });
          showToast("Email verified!", "success");
          navigate("/selectrole");
        })
        .catch(() => {
          showToast("Verification failed. Try again.", "error");
          navigate("/verify-pending");
        });
    }
  }, [searchParams, navigate, showToast]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Logo />
      <div className="flex-1 flex flex-col justify-center items-start p-16 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verifying your email...
          </h2>
          <p className="text-gray-600 mb-6">
            Please wait while we verify your email. You will be redirected
            shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailComplete;
