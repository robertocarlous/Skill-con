import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Loginpage.jsx';
import SignUp from './pages/SignUp.jsx';
import ErrorBoundary from './pages/ErrorBoundary.jsx';
import NotFound from './pages/NotFound.jsx';
import VerifyPage from './pages/VerifyPage.jsx';
import VerifyIdentity from './pages/VerifyIdentity.jsx';
import SelectRole from './pages/SelectRole.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/verifyidentity" element={<VerifyIdentity />} />
        <Route path="/selectrole" element={<SelectRole />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}
