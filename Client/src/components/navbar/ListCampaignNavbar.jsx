const ListCampaignNavbar = () => (
  <nav
    className="w-full sticky top-0 z-40
    bg-gradient-to-r from-slate-900/90 via-blue-900/80 to-green-900/80
    dark:from-slate-950 dark:to-blue-900/90
    border-b border-blue-600/30 dark:border-green-900/40
    shadow-lg backdrop-blur
    px-2 sm:px-4 md:px-8 py-2.5 sm:py-3 flex items-center justify-between"
  >
    <div
      className="flex items-center cursor-pointer select-none"
      onClick={() => (window.location.href = "/")}
    >
      <span className="bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent font-extrabold text-base sm:text-xl md:text-2xl tracking-tight">
        FuelFundr
      </span>
    </div>
    {/* ...Add buttons/header actions if needed */}
  </nav>
);

export default ListCampaignNavbar;
