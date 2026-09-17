import { useAuthStore } from "../../store/authStore";
import { LoaderCircleIcon, Lock, X } from "lucide-react";
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
      <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );

  if (isAuthenticated) {
    // Always release scroll if authed
    if (typeof window !== "undefined") document.body.style.overflow = "";
    return children;
  }

  // Unauthed: full modal lock overlay
  return (
    <div className="fixed inset-0 z-[9999] min-h-screen w-full flex items-center justify-center bg-slate-950/60 backdrop-blur-xs px-6 select-none">
      {/* Blurred background view */}
      <div className="fixed inset-0 pointer-events-none select-none filter blur-[4px] opacity-60">
        {children}
      </div>
      
      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-sm yc-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-8 text-center flex flex-col items-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 border border-indigo-500/20">
          <Lock className="w-5 h-5 text-indigo-500" />
        </div>
        
        <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-2">
          Authentication Required
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-xs leading-relaxed">
          You must log in to view or manage this campaign section.
        </p>
        
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition cursor-pointer uppercase tracking-widest"
          >
            Log In / Sign Up
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:border-slate-350 transition cursor-pointer text-xs font-bold uppercase tracking-widest"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
