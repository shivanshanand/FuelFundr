import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { Award, Gift, Rocket, Trophy, Users } from "lucide-react";

const BADGE_DETAILS = {
  "First Donation": {
    icon: <Gift className="w-8 h-8 text-yellow-400 animate-wiggle-slow" />,
    label: "First Donation",
    desc: "Made your very first donation. Welcome to the community!",
  },
  Contributor: {
    icon: <Users className="w-8 h-8 text-blue-400 animate-bounce" />,
    label: "Contributor",
    desc: "Made 3+ donations to support campaigns.",
  },
  Supporter: {
    icon: <Award className="w-8 h-8 text-green-400 animate-tada" />,
    label: "Supporter",
    desc: "Donated a total of ₹1,000 or more.",
  },
  Campaigner: {
    icon: <Rocket className="w-8 h-8 text-pink-400 animate-spin-slow" />,
    label: "Campaigner",
    desc: "Started your first campaign.",
  },
  Fundraiser: {
    icon: <Trophy className="w-8 h-8 text-orange-400 animate-bounce-slow" />,
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm px-2 py-6 sm:py-0">
      <Confetti width={dimensions.width} height={dimensions.height} />
      <div className="bg-white/95 dark:bg-slate-900/90 border-4 border-green-400 rounded-2xl shadow-2xl w-full max-w-md px-4 sm:px-8 py-6 sm:py-7 pb-9 text-center flex flex-col items-center animate-in fade-in zoom-in mx-auto">
        <button
          className="
    absolute top-3 right-3 
    w-10 h-10 
    flex items-center justify-center
    rounded-full 
    bg-green-500/85 hover:bg-blue-600 transition-colors
    text-white text-2xl font-extrabold shadow-lg border-2 border-white/70
    focus:outline-none focus:ring-2 focus:ring-blue-500
    z-10
  "
          onClick={onClose}
          aria-label="Close Modal"
        >
          ×
        </button>

        <span className="text-5xl sm:text-6xl mb-1 animate-bounce">🎉</span>
        <h2 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-4 tracking-tight">
          You earned a badge!
        </h2>
        <ul className="space-y-3 mb-2 w-full">
          {badges.map((badge, i) => {
            const info = BADGE_DETAILS[badge] || {
              icon: "🏅",
              name: badge,
              desc: "",
            };
            return (
              <li
                key={i}
                className="flex flex-col items-center justify-center gap-2 text-base sm:text-lg font-semibold text-blue-900 dark:text-green-300 bg-green-50 dark:bg-slate-800/50 py-2 px-4 rounded-xl shadow"
              >
                <span className="text-3xl">{info.icon}</span>
                <span className="font-bold">{info.label}</span>
                {info.desc && (
                  <span className="text-sm text-green-700 dark:text-green-300">
                    {info.desc}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <span className="mt-2 text-green-500 dark:text-green-300 text-sm sm:text-base font-semibold tracking-wide">
          Keep going for more achievements!
        </span>
      </div>
    </div>
  );
};

export default BadgeModal;
