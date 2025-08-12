import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-900 flex items-center justify-center relative overflow-hidden transition-colors duration-300">
      {/* Centered glass card */}
      <div className="p-10 bg-white dark:bg-slate-900/80 bg-opacity-80 rounded-2xl shadow-2xl border border-blue-200 dark:border-slate-800 flex flex-col items-center">
        <motion.div
          className="w-16 h-16 border-4 border-b-4 border-blue-700/70 border-b-green-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
        />
        <span className="mt-6 text-blue-700 dark:text-green-400 text-lg font-semibold animate-pulse tracking-wide">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
