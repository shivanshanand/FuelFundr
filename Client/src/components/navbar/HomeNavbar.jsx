import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle2, Menu, X, ChevronDown } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { getInitials } from "../../utils/initials";

const HomeNavbar = () => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  // Dropdown close on outside click
  useEffect(() => {
    function close(e) {
      if (
        !e.target.closest("#profile-dropdown-menu") &&
        !e.target.closest("#profile-dropdown-btn")
      )
        setProfileDropdown(false);
    }
    if (profileDropdown) {
      document.addEventListener("mousedown", close);
      return () => document.removeEventListener("mousedown", close);
    }
  }, [profileDropdown]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/75 dark:bg-slate-950/75 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white flex items-center gap-1 select-none"
        >
          FuelFundr<span className="text-indigo-500">.</span>
        </Link>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4 relative">
            <button
              id="profile-dropdown-btn"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-500 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition-all duration-200 shadow-sm cursor-pointer"
              onClick={() => setProfileDropdown(!profileDropdown)}
              title="Account"
            >
              {isAuthenticated ? (
                getInitials(user?.name) ? (
                  <span className="w-7 h-7 flex items-center justify-center text-xs font-black rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 select-none">
                    {getInitials(user?.name)}
                  </span>
                ) : (
                  <UserCircle2 className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                )
              ) : (
                <UserCircle2 className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              )}
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm ml-1 select-none">
                {isAuthenticated
                  ? user?.name?.split(" ")[0] || "User"
                  : "Guest"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  profileDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {profileDropdown && (
              <div
                id="profile-dropdown-menu"
                className="absolute right-0 top-12 mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <Link
                  to="/dashboard"
                  className="flex px-4 py-2 text-sm text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg mx-1 transition-colors"
                  onClick={() => setProfileDropdown(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/leaderboard"
                  className="flex px-4 py-2 text-sm text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg mx-1 transition-colors"
                  onClick={() => setProfileDropdown(false)}
                >
                  Leaderboard
                </Link>
                {!isAuthenticated && (
                  <div className="px-2 pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                    <button
                      onClick={() => {
                        setProfileDropdown(false);
                        navigate("/login");
                      }}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition shadow-sm cursor-pointer"
                    >
                      Login / Register
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile nav controls */}
        <button
          className="md:hidden flex items-center p-1 text-slate-700 dark:text-slate-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shadow-lg py-6 px-6 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 w-full justify-center">
              <span className="w-10 h-10 flex items-center justify-center font-black rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 select-none">
                {isAuthenticated ? getInitials(user?.name) || "U" : "G"}
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">
                {isAuthenticated
                  ? user?.name?.split(" ")[0] || "User"
                  : "Guest"}
              </span>
            </div>

            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center px-6 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-semibold bg-white/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/leaderboard"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center px-6 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-semibold bg-white/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Leaderboard
            </Link>
            {!isAuthenticated && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition shadow"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;
