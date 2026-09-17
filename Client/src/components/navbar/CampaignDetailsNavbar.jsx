import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share2 } from "lucide-react";
import { toast } from "react-toastify";

const CampaignDetailsNavbar = () => {
  const navigate = useNavigate();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <nav
      className="w-full sticky top-0 z-40 bg-white/75 dark:bg-slate-950/75 border-b border-slate-200/50 dark:border-white/5 shadow-sm flex flex-row items-center justify-between px-6 py-3.5 backdrop-blur-md transition-colors duration-200"
    >
      {/* Left: Back to Campaigns */}
      <button
        onClick={() => navigate("/campaigns")}
        className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-150 text-sm px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Campaigns</span>
      </button>

      {/* Right: Share */}
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-200 shadow-sm cursor-pointer"
      >
        <Share2 className="w-4 h-4 text-slate-400" />
        <span>Share</span>
      </button>
    </nav>
  );
};

export default CampaignDetailsNavbar;
