const MinimalFooter = () => (
  <footer
    className="
      w-full
      py-3
      px-6
      bg-gradient-to-r from-slate-900/80 via-blue-900/70 to-green-900/80
      dark:from-slate-950 dark:via-blue-950/80 dark:to-green-900/90
      backdrop-blur-[3px]
      text-center
      text-xs
      font-medium
      text-green-100
      dark:text-green-200
      tracking-wide
      shadow-inner
      border-t border-blue-800/30 dark:border-green-900/40
      select-none
    "
  >
    <span>
      &copy; {new Date().getFullYear()}{" "}
      <span className="font-bold tracking-widest text-green-300 dark:text-green-200">
        FuelFundr
      </span>
      <span className="mx-2 text-blue-200/70 dark:text-green-200/70">|</span>
      <span className="italic text-blue-100/90 dark:text-white">
        For students, by students.
      </span>
    </span>
  </footer>
);

export default MinimalFooter;
