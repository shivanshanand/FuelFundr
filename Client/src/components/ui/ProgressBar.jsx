import { motion } from "framer-motion";

const ProgressBar = ({ raised = 0, target = 100 }) => {
  const percentage = target > 0 ? Math.min((raised / target) * 100, 100) : 0;

  return (
    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-indigo-500 rounded-full"
      />
    </div>
  );
};

export default ProgressBar;
