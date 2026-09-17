const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6 select-none transition-colors duration-200">
      <div className="yc-card p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center shadow-lg w-full max-w-xs">
        <div className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-4 animate-pulse">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
