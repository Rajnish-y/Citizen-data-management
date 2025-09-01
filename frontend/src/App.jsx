import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CitizenLogin from "./pages/CitizenLogin";
import AuthorityLogin from "./pages/AuthorityLogin";
import CitizenSignup from "./pages/CitizenSignup";
import AuthoritySignup from "./pages/AuthoritySignup";
import CitizenDashboard from "./pages/CitizenDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      <Router>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Citizen */}
          <Route path="/citizen-login" element={<CitizenLogin />} />
          <Route path="/citizen-signup" element={<CitizenSignup />} />
          <Route path="/citizen-dashboard" element={<CitizenDashboard />} />

          {/* Authority */}
          <Route path="/authority-login" element={<AuthorityLogin />} />
          <Route path="/authority-signup" element={<AuthoritySignup />} />
          <Route path="/authority-dashboard" element={<AuthorityDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
