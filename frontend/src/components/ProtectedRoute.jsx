import { useUserStore } from "../store/userStore";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  requireVerified = false,
  requireRole = false,
  requireProfile = false,
  requireClientRole = false,
}) => {
  const user = useUserStore((s) => s.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (requireVerified && !user.emailVerified) {
    return <Navigate to="/verify-pending" replace />;
  }
  if (requireRole && !user.role) {
    return <Navigate to="/selectrole" replace />;
  }
  if (requireClientRole && user.role !== "client") {
    return (
      <div className="p-8 text-red-600 font-bold">
        Access denied: Clients only
      </div>
    );
  }
  if (requireProfile && !user.profileCompleted) {
    if (user.role === "client") return <Navigate to="/clientprofile" replace />;
    if (user.role === "artisan")
      return <Navigate to="/artisanprofile" replace />;
    return <Navigate to="/welcome" replace />;
  }
  return children;
};

export default ProtectedRoute;
