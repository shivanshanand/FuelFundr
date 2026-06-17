import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader, Chrome } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, isLoading } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      await login(email, password);
      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
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
            Welcome Back
          </h2>
          <form onSubmit={handleLogin} autoComplete="off">
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

            <div className="flex justify-end mb-6">
              <Link
                to="/forgot-password"
                className="text-sm text-green-500 dark:text-green-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold rounded-xl shadow-lg hover:from-blue-800 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 transition-all duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={22} />
              ) : (
                "Login"
              )}
            </motion.button>

            <div className="relative my-6">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-gray-300 dark:border-gray-700" />
  </div>
  <div className="relative flex justify-center text-sm">
    <span className="px-3 bg-white dark:bg-slate-900 text-gray-500">
      or continue with
    </span>
  </div>
</div>

<motion.button
  type="button" 
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  onClick={handleGoogleLogin}
  className="w-full flex items-center justify-center gap-3 py-3 px-4 
             rounded-xl font-semibold shadow-md border 
             border-gray-300 dark:border-slate-700
             bg-white dark:bg-slate-800 
             hover:bg-gray-50 dark:hover:bg-slate-700
             transition-all duration-200"
>
  <Chrome className="w-5 h-5 text-red-500" />
  <span className="text-gray-700 dark:text-gray-200">
    Continue with Google
  </span>
</motion.button>

          </form>
        </div>
        <div className="px-8 py-4 bg-blue-50 dark:bg-slate-800 flex justify-center border-t border-blue-200 dark:border-slate-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-green-500 dark:text-green-400 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
