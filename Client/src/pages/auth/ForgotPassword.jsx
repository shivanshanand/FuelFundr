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

    if (email == "") {
      toast.error("Email is required.");
      return
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
        "If an account exists, a reset link will be sent to your email shortly."
      );
    } catch (err) {
      toast.error(
        "Unable to process your request. Please check entered mail or try later."
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
          <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent">
            Forgot Password
          </h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} autoComplete="off">
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </p>
              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold rounded-xl shadow-lg hover:from-blue-800 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 transition-all duration-200"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="w-6 h-6 animate-spin mx-auto" />
                ) : (
                  "Send Reset Link"
                )}
              </motion.button>
            </form>
          ) : (
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                className="w-16 h-16 bg-green-400 dark:bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow"
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                If an account exists for{" "}
                <span className="text-blue-700 dark:text-blue-300 font-semibold">
                  {email}
                </span>
                , you will receive a password reset link shortly.
              </p>
            </div>
          )}
        </div>

        <div className="px-8 py-4 bg-blue-50 dark:bg-slate-800 flex justify-center border-t border-blue-200 dark:border-slate-700">
          <Link
            to={"/login"}
            className="text-sm text-green-500 dark:text-green-400 hover:underline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
export default ForgotPassword;
