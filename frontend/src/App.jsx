import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from './config/wagmi';
import LandingPage from "./pages/LandingPage";
import CitizenLogin from "./pages/CitizenLogin";
import AuthorityLogin from "./pages/AuthorityLogin";
import CitizenSignup from "./pages/CitizenSignup";
import AuthoritySignup from "./pages/AuthoritySignup";
import CitizenDashboard from "./pages/CitizenDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
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
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
