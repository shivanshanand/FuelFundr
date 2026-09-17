import { useNavigate } from "react-router-dom";

const CreateCampaignNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav
      className="w-full sticky top-0 z-40 bg-white/75 dark:bg-slate-950/75 border-b border-slate-200/50 dark:border-white/5 px-6 py-4 flex items-center justify-between shadow-sm backdrop-blur-md transition-colors duration-200"
    >
      <div
        className="flex items-center gap-1 cursor-pointer select-none"
        onClick={() => navigate("/")}
        title="Go Home"
      >
        <span className="text-slate-900 dark:text-white font-black text-xl tracking-tighter">
          FuelFundr<span className="text-indigo-500">.</span>
        </span>
      </div>
    </nav>
  );
};

export default CreateCampaignNavbar;
