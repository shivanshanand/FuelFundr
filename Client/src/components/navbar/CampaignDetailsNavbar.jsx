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
      className="w-full sticky top-0 z-40
      bg-gradient-to-r from-slate-900/90 via-blue-900/80 to-green-900/80
      dark:from-slate-950 dark:to-blue-900/90
      border-b border-blue-600/30 dark:border-green-900/40
      shadow-lg flex flex-row items-center justify-between
      px-2 sm:px-4 md:px-8 py-2.5 sm:py-3 backdrop-blur transition-colors"
    >
      {/* Left: Back to Campaigns */}
      <button
        onClick={() => navigate("/campaigns")}
        className="flex items-center gap-2 text-blue-100 dark:text-green-300 font-bold hover:text-green-300 transition text-base px-2 py-1 rounded-lg hover:bg-blue-800/30 dark:hover:bg-green-600/10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden xs:inline md:inline-block">Back</span>
      </button>

      {/* Right: Share */}
      <button
        onClick={handleShare}
        className="flex items-center gap-1 px-4 py-2 border border-blue-300 dark:border-green-700 rounded-xl
          bg-gradient-to-r from-blue-900 via-green-800 to-blue-800 dark:from-blue-800 dark:to-green-900 text-white font-semibold text-base
          hover:bg-green-700/80 hover:border-green-400 hover:text-green-200 dark:hover:bg-green-900 transition shadow"
      >
        <Share2 className="w-5 h-5" />
        <span className="hidden sm:inline font-medium">Share</span>
      </button>
    </nav>
  );
};

export default CampaignDetailsNavbar;
