import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { Award, Gift, Rocket, Trophy, Users, X } from "lucide-react";

const BADGE_DETAILS = {
  "First Donation": {
    icon: <Gift className="w-8 h-8 text-indigo-500 animate-float" />,
    label: "First Donation",
    desc: "Made your very first donation. Welcome to the community!",
  },
  Contributor: {
    icon: <Users className="w-8 h-8 text-indigo-500 animate-icon-pulse" />,
    label: "Contributor",
    desc: "Made 3+ donations to support campaigns.",
  },
  Supporter: {
    icon: <Award className="w-8 h-8 text-indigo-500 animate-wiggle" />,
    label: "Supporter",
    desc: "Donated a total of ₹1,000 or more.",
  },
  Campaigner: {
    icon: <Rocket className="w-8 h-8 text-indigo-500 animate-float-delayed" />,
    label: "Campaigner",
    desc: "Started your first campaign.",
  },
  Fundraiser: {
    icon: <Trophy className="w-8 h-8 text-indigo-500 animate-icon-bounce" />,
    label: "Fundraiser",
    desc: "Started 3+ campaigns.",
  },
};

const BadgeModal = ({ show, badges = [], onClose }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-950/60 backdrop-blur-xs px-6">
      <Confetti width={dimensions.width} height={dimensions.height} numberOfPieces={80} recycle={false} />
      
      <div className="relative yc-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 w-full max-w-sm p-8 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-400 hover:text-slate-650 hover:border-slate-300 dark:hover:text-white dark:hover:border-slate-800 transition cursor-pointer"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-4xl mb-2 animate-bounce-custom">🎉</span>
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
          New Badge Unlocked!
        </h2>
        
        <div className="w-full space-y-4 mb-6">
          {badges.map((badge, i) => {
            const info = BADGE_DETAILS[badge] || {
              icon: <Trophy className="w-8 h-8 text-indigo-500" />,
              label: badge,
              desc: "",
            };
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-150 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/20"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-500/5 flex items-center justify-center border border-indigo-500/10 mb-3 shrink-0">
                  {info.icon}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                  {info.label}
                </h4>
                {info.desc && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[220px]">
                    {info.desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl font-bold text-white text-xs bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer uppercase tracking-widest"
        >
          Awesome
        </button>
      </div>
    </div>
  );
};

export default BadgeModal;
