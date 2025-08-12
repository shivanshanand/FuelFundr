import { useAuthStore } from "../../store/authStore";
import { LoaderCircleIcon, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isAuthenticated && !isCheckingAuth) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isAuthenticated, isCheckingAuth]);

  if (isCheckingAuth)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoaderCircleIcon className="animate-spin w-14 h-14 text-blue-700 dark:text-green-300" />
      </div>
    );

  if (isAuthenticated) {
    // Always release scroll if authed
    if (typeof window !== "undefined") document.body.style.overflow = "";
    return children;
  }

  // Unauthed: full modal lock
  return (
    <div className="fixed inset-0 z-[9999] min-h-screen w-full flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
      {/* Blurred content behind (visual only, not focusable) */}
      <div className="fixed inset-0 pointer-events-none select-none filter blur-[5px] opacity-70">
        {children}
      </div>
      {/* Modal */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="bg-white/95 dark:bg-slate-900/95 border-2 border-blue-400 dark:border-green-400 p-8 max-w-xs w-[94vw] mx-auto rounded-2xl shadow-2xl flex flex-col items-center text-center">
          <Lock className="w-10 h-10 text-blue-500 dark:text-green-300 mb-3" />
          <h2 className="text-lg font-extrabold text-blue-700 dark:text-green-200 mb-3">
            Login Required
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-5 font-medium">
            You must log in to access this section.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full px-6 py-2 mb-3 rounded-lg bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold shadow hover:from-blue-800 hover:to-green-500 transition"
          >
            Login / Sign Up
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-2 rounded-lg border-2 border-blue-400 dark:border-green-400 bg-white/90 dark:bg-slate-900/80 text-blue-700 dark:text-green-300 font-semibold mt-1 hover:bg-blue-50 dark:hover:bg-green-900 transition"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
