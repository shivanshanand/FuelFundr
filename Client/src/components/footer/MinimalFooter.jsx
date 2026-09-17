const MinimalFooter = () => (
  <footer
    className="w-full py-4 px-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-white/5 text-center text-xs font-mono text-slate-500 dark:text-slate-400 tracking-tight transition-colors duration-200 select-none"
  >
    <span>
      &copy; {new Date().getFullYear()}{" "}
      <span className="font-bold text-slate-800 dark:text-slate-200">
        FuelFundr.
      </span>
      <span className="mx-2 text-slate-300 dark:text-slate-800">|</span>
      <span className="text-slate-400 dark:text-slate-500">
        For students, by students.
      </span>
    </span>
  </footer>
);

export default MinimalFooter;
