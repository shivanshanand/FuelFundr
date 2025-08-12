import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/ui/Input";
import { Lock, Loader } from "lucide-react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, isLoading } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Fill the required fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await resetPassword(token, password);
      toast.success(
        "Password reset successfully, redirecting to login page..."
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-slate-900/80 bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-200 dark:border-slate-800 overflow-hidden transition-colors duration-300"
      >
        <div className="p-8">
          <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <Input
              icon={Lock}
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold rounded-xl shadow-lg hover:from-blue-800 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 transition-all duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" /> Resetting...
                </span>
              ) : (
                "Set New Password"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
export default ResetPassword;
