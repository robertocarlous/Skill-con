import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import VerifyPending from "./pages/auth/VerifyPending";
import VerifyEmailComplete from "./pages/auth/VerifyEmailComplete";
// import VerifyIdentity from "./pages/auth/VerifyIdentity";
import SelectRole from "./pages/auth/SelectRole";
import ErrorBoundary from "./pages/ErrorBoundary";
import ArtisanProfile from "./pages/Artisan/ArtisanProfile";
import ClientProfile from "./pages/Client/ClientProfile";
import ClientDashboard from "./pages/Client/ClientDashboard";
import ArtisanDashboard from "./pages/Artisan/ArtisanDashBoard";
import PostNewJob from "./pages/Client/PostNewJob";
import PreviewPost from "./pages/Client/PreviewPost";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage/LandingPage";
import ScrollToTop from "./components/ScrollToTop";
import { useAuthInit } from "./hooks/useAuthInit";
import SkillConnectHero from "./components/ImageScroll";

function App() {
  useAuthInit();

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-pending" element={<VerifyPending />} />
        <Route path="/hero" element={<SkillConnectHero />} />
        <Route
          path="/verify-email-complete"
          element={<VerifyEmailComplete />}
        />
        <Route
          path="/selectrole"
          element={
            <ProtectedRoute requireVerified={true}>
              <SelectRole />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artisanprofile"
          element={
            <ProtectedRoute requireVerified={true} requireRole={true}>
              <ArtisanProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientprofile"
          element={
            <ProtectedRoute requireVerified={true} requireRole={true}>
              <ClientProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client-dashboard"
          element={
            <ProtectedRoute
              requireVerified={true}
              requireRole={true}
              requireProfile={true}
            >
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artisan-dashboard"
          element={
            <ProtectedRoute
              requireVerified={true}
              requireRole={true}
              requireProfile={true}
            >
              <ArtisanDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-job"
          element={
            <ProtectedRoute
              requireVerified={true}
              requireRole={true}
              requireClientRole={true}
            >
              <PostNewJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preview-post"
          element={
            <ProtectedRoute
              requireVerified={true}
              requireRole={true}
              requireClientRole={true}
            >
              <PreviewPost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
