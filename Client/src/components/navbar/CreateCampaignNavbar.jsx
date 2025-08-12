import { useNavigate } from "react-router-dom";

const CreateCampaignNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav
      className="w-full sticky top-0 z-40
      bg-gradient-to-r from-slate-900/90 via-blue-900/80 to-green-900/80
      dark:from-slate-950 dark:to-blue-900/90
      border-b border-blue-600/30 dark:border-green-900/40
      px-2 sm:px-4 md:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-lg backdrop-blur"
    >
      {/* Logo / Platform Name */}
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => navigate("/")}
        title="Go Home"
      >
        <span className="bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent font-extrabold text-base sm:text-lg md:text-xl tracking-wide">
          FuelFundr
        </span>
      </div>
    </nav>
  );
};

export default CreateCampaignNavbar;
