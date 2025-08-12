import { motion } from "framer-motion";

const ProgressBar = ({ raised = 0, target = 100 }) => {
  const percentage = target > 0 ? Math.min((raised / target) * 100, 100) : 0;

  return (
    <div className="w-full h-3 bg-gradient-to-r from-slate-200 via-blue-100 to-blue-200 dark:from-slate-800 dark:via-slate-800 dark:to-blue-950 rounded-full shadow-sm overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1 }}
        className="h-full bg-gradient-to-r from-blue-700 to-green-400 dark:from-blue-600 dark:to-green-300 rounded-full"
      />
    </div>
  );
};

export default ProgressBar;
