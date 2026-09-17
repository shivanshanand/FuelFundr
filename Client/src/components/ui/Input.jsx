const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-4 select-none">
      {/* Icon on the left */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
      </div>
      {/* Main input */}
      <input
        {...props}
        className={`
          w-full pl-10 pr-3.5 py-2 rounded-lg
          bg-slate-50 dark:bg-slate-950
          border border-slate-200 dark:border-white/10
          text-slate-900 dark:text-white
          placeholder-slate-400 dark:placeholder-slate-650
          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
          transition-all duration-150 text-sm shadow-sm
        `}
      />
    </div>
  );
};
export default Input;
