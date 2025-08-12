import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "./store/authStore";

import Home from "./pages/ui/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/ui/Dashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import EmailVerification from "./pages/auth/EmailVerification";
import CampaignDetails from "./components/campaigns/CampaignDetails";
import CreateCampaign from "./components/campaigns/CreateCampaign";
import CampaignList from "./pages/ui/CampaignList";
import LeaderboardPage from "./pages/ui/LeaderboardPage";
import About from "./pages/ui/About";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import RedirectAuthenticatedUser from "./utils/RedirectAuthenticatedUser";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import AppLoader from "./components/ui/AppLoader";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Get auth state from your store
  const { isCheckingAuth, checkAuth, isAuthenticated } = useAuthStore();

  // Show loader only if not authenticated and first load this session
  const [showSplash, setShowSplash] = useState(() => {
    // If user already authenticated, skip splash
    if (isAuthenticated) return false;
    // Otherwise, show splash only if not shown this session
    return sessionStorage.getItem("appLoaded") !== "true";
  });

  // Handles splash loader
  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("appLoaded", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Handles authentication check (ALWAYS call at top)
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show splash only if needed
  if (showSplash) return <AppLoader />;
  // Show spinner if checking authentication (but not splash)
  if (isCheckingAuth) return <LoadingSpinner />;

  // Main app routing after splash and auth check
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectAuthenticatedUser>
              <Register />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/campaigns" element={<CampaignList />} />
        <Route
          path="/campaigns/create"
          element={
            <ProtectedRoute>
              <CreateCampaign />
            </ProtectedRoute>
          }
        />
        <Route path="/campaigns/:id" element={<CampaignDetails />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
    </Router>
  );
}

export default App;
