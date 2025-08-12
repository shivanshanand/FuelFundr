import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle2, Menu, X, ArrowDown } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { getInitials } from "../../utils/initials";

const HomeNavbar = () => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  // Dropdown close on outside
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 dark:bg-slate-950/80 backdrop-blur-xl border-b border-blue-200/40 dark:border-green-900/30 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent flex items-center gap-2"
        >
          FuelFundr
        </Link>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button
              id="profile-dropdown-btn"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 via-blue-800 to-green-500 border-2 border-blue-700 shadow hover:scale-105 transition"
              onClick={() => setProfileDropdown(!profileDropdown)}
              title="Account"
              style={{ minWidth: "32px", minHeight: "40px" }}
            >
              {isAuthenticated ? (
                getInitials(user?.name) ? (
                  <span className="text-lg md:text-xl font-extrabold text-white dark:text-green-200">
                    {getInitials(user?.name)}
                  </span>
                ) : (
                  <UserCircle2 className="w-7 h-7 text-white" />
                )
              ) : (
                <UserCircle2 className="w-7 h-7 text-white" />
              )}
              <span className="font-bold text-white text-base ml-2">
                {isAuthenticated
                  ? user?.name?.split(" ")[0] || "User"
                  : "Guest"}
              </span>
              <ArrowDown
                className={`w-5 h-5 mt-1 text-extrabold text-blue-400 dark:text-green-300 transition-transform duration-200 ${
                  profileDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {profileDropdown && (
              <div
                id="profile-dropdown-menu"
                className="absolute right-7 top-16 mt-2 min-w-[180px] rounded-xl shadow-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 z-50 py-2"
              >
                <Link
                  to="/dashboard"
                  className="flex px-5 py-2 text-blue-700 dark:text-green-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-800 rounded-xl transition items-center gap-2"
                  onClick={() => setProfileDropdown(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/leaderboard"
                  className="flex px-5 py-2 text-blue-700 dark:text-green-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-800 rounded-xl transition items-center gap-2"
                  onClick={() => setProfileDropdown(false)}
                >
                  Leaderboard
                </Link>
                {!isAuthenticated && (
                  <div className="py-2 text-center">
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full px-4 py-2 mt-2 bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold rounded-md hover:from-blue-800 hover:to-green-500"
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
          className="md:hidden flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-7 h-7 text-blue-700 dark:text-green-400" />
          ) : (
            <Menu className="w-7 h-7 text-blue-700 dark:text-green-400" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-950/95 border-t border-blue-200/30 shadow-xl transition-all z-50">
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="flex items-center gap-3 w-full justify-center">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-green-400 bg-gradient-to-r from-green-300/80 to-blue-400/60 shadow"
                title="Account"
              >
                {isAuthenticated ? (
                  getInitials(user?.name) ? (
                    <span className="text-lg font-extrabold text-blue-700 dark:text-green-200">
                      {getInitials(user?.name)}
                    </span>
                  ) : (
                    <UserCircle2 className="w-7 h-7 text-blue-700 dark:text-green-200" />
                  )
                ) : (
                  <UserCircle2 className="w-7 h-7 text-blue-700 dark:text-green-200" />
                )}
              </button>
              <span className="font-bold text-blue-800 dark:text-green-200 text-lg">
                {isAuthenticated
                  ? user?.name?.split(" ")[0] || "User"
                  : "Guest"}
              </span>
            </div>

            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-2 mt-1 rounded-lg border-2 border-green-400 text-green-800 dark:text-green-200 font-bold bg-white/70 dark:bg-slate-900/80 hover:bg-green-100 dark:hover:bg-green-900 shadow transition"
            >
              Dashboard
            </Link>
            <Link
              to="/leaderboard"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-2 rounded-lg border-2 border-blue-400 text-blue-800 dark:text-green-200 font-bold bg-white/80 dark:bg-slate-900/80 hover:bg-blue-100 dark:hover:bg-green-800 shadow transition flex items-center gap-2"
            >
              Leaderboard
            </Link>
            {!isAuthenticated && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full mt-2 px-7 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold shadow hover:from-blue-800 hover:to-green-500"
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
