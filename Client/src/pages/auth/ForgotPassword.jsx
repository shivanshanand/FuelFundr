import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import Input from "../../components/ui/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast.success(
        "If an account exists, a reset link will be sent shortly."
      );
    } catch (err) {
      toast.error(
        "Unable to process your request. Please try later."
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
            Forgot Password
          </h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} autoComplete="off">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 text-center leading-relaxed">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition cursor-pointer flex items-center justify-center mt-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin w-4 h-4" />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 border border-indigo-500/20">
                <Mail className="h-5 w-5 text-indigo-500" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                If an account exists for <span className="font-bold text-slate-700 dark:text-slate-350">{email}</span>, you will receive a reset link shortly.
              </p>
            </div>
          )}
        </div>

        <div className="px-8 py-4 bg-slate-50 dark:bg-slate-950/40 flex justify-center border-t border-slate-200/50 dark:border-white/5">
          <Link
            to="/login"
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold flex items-center gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
