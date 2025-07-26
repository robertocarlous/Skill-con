import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/auth/LogIn";
import MultiStepForm from "./pages/MultiStepForm";
import VerifyIdentity from "./pages/auth/VerifyIdentity";
import SelectRole from "./pages/auth/SelectRole";
import ErrorBoundary from "./pages/ErrorBoundary";
import ArtisanProfile from "./pages/Artisan/ArtisanProfile";
import UploadCertifications from "./pages/Artisan/UploadCertifications";
import ClientProfile from "./pages/Client/ClientProfile";
import ClientDashBoard from "./pages/Client/ClientDashBoard";
import PostNewJob from "./pages/Client/PostNewJob";
import PreviewPost from "./pages/Client/PreviewPost";
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<MultiStepForm />} />
        <Route path="/verifyidentity" element={<VerifyIdentity />} /> 
        <Route path="/selectrole" element={<SelectRole />} />
        <Route path="/artisanprofile" element={<ArtisanProfile />} />
        <Route path="/uploadcert" element={<UploadCertifications />} />
        <Route path="/clientprofile" element={<ClientProfile />} /> 
        <Route path="/client/dashboard" element={<ClientDashBoard />} />
        <Route path="/post-job" element={<PostNewJob />} />
        <Route path="/preview-post" element={<PreviewPost />} />
      
    
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
