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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-200 px-6 select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-sm w-full yc-card overflow-hidden shadow-xl"
      >
        <div className="p-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 text-center">
            Sign Up
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
            <PasswordStrengthMeter password={password} />

            <button
              className="mt-6 w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm hover:shadow-indigo-600/10 transition cursor-pointer flex items-center justify-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin w-4 h-4" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
        
        <div className="px-8 py-4 bg-slate-50 dark:bg-slate-950/40 flex justify-center border-t border-slate-200/50 dark:border-white/5">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
