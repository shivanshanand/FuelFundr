import { motion } from "framer-motion";
import Input from "../../components/ui/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../../components/ui/PasswordStrengthMeter";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { register, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim() || name.trim().length < 3) {
      toast.error("Name must be at least 3 characters.");
      return;
    }
    if (!email.trim() || !emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      await register(email, password, name);
      toast.success("Registration successful! Please verify your email.");
      setTimeout(() => navigate("/verify-email"), 1000);
    } catch (err) {
      toast.error(
        err?.message ||
          "Registration failed. Try a different email or password."
      );
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
          <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent">
            Create Account
          </h2>
          <form onSubmit={handleSignUp} autoComplete="off">
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-3">
              <PasswordStrengthMeter password={password} />
            </div>

            <motion.button
              className="mt-7 w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold rounded-xl shadow-lg hover:from-blue-800 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-blue-50 dark:bg-slate-800 flex justify-center border-t border-blue-200 dark:border-slate-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-green-500 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default Register;
