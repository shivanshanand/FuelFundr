const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      {/* Icon on the left */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="w-5 h-5 text-green-500 dark:text-green-400" />
      </div>
      {/* Main input */}
      <input
        {...props}
        className={`
          w-full pl-11 pr-3 py-2.5
          rounded-xl
          bg-white/80 dark:bg-slate-900/80
          border border-gray-300 dark:border-slate-700
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400/60
          transition-all duration-200
          shadow-sm
        `}
      />
    </div>
  );
};
export default Input;
