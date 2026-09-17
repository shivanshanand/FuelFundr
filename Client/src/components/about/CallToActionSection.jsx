import { useState } from "react";
import { Rocket, Users } from "lucide-react";
import { Link } from "react-router-dom";
import ComingSoonModal from "../modals/ComingSoonModal ";

const CallToActionSection = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <section className="w-full py-16 px-6 bg-slate-50 dark:bg-slate-950/20 flex flex-col items-center select-none">
      <div className="max-w-3xl w-full yc-card p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex flex-col items-center text-center shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 leading-relaxed max-w-md">
          Launch a campaign, support a peer, or join our student network. FuelFundr is where campus change begins.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">
          <Link
            to="/campaigns/create"
            className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Rocket className="w-4 h-4" />
            <span>Launch Campaign</span>
          </Link>
          
          <button
            type="button"
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:border-slate-350 transition text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            onClick={() => setShowComingSoon(true)}
          >
            <Users className="w-4 h-4 text-slate-400" />
            <span>Join Network</span>
          </button>
        </div>
        
        <div className="mt-8 text-[11px] font-mono text-slate-400 dark:text-slate-500">
          Have questions?{" "}
          <a
            href="mailto:support@fuelfundr.com"
            className="underline underline-offset-2 hover:text-indigo-500 transition-colors"
          >
            Contact us
          </a>
        </div>
      </div>

      <ComingSoonModal
        show={showComingSoon}
        onClose={() => setShowComingSoon(false)}
      />
    </section>
  );
};

export default CallToActionSection;
