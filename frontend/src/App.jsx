import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import VerifyPage from "./pages/auth/VerifyPage";
// import VerifyIdentity from "./pages/auth/VerifyIdentity";
import SelectRole from "./pages/auth/SelectRole";
import ErrorBoundary from "./pages/ErrorBoundary";
import ArtisanProfile from "./pages/Artisan/ArtisanProfile";
import ClientProfile from "./pages/Client/ClientProfile";
import ClientDashboard from "./pages/Client/ClientDashboard";
import ArtisanDashboard from "./pages/Artisan/ArtisanDashBoard";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/verifyidentity" element={<VerifyIdentity />} /> */}
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/selectrole" element={<SelectRole />} />
        <Route path="/artisanprofile" element={<ArtisanProfile />} />
        <Route path="/clientprofile" element={<ClientProfile />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/artisan-dashboard" element={<ArtisanDashboard />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
