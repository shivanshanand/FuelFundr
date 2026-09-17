import { Award, Gift, Rocket, Users, Trophy } from "lucide-react";
import { FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const BADGE_DETAILS = {
  "First Donation": {
    icon: <Gift className="w-6 h-6 text-indigo-500" />,
    label: "First Donation",
    desc: "Made your very first donation. Welcome to the community!",
  },
  Contributor: {
    icon: <Users className="w-6 h-6 text-indigo-500 animate-icon-pulse" />,
    label: "Contributor",
    desc: "Made 3+ donations to support campaigns.",
  },
  Supporter: {
    icon: <Award className="w-6 h-6 text-indigo-500 animate-wiggle" />,
    label: "Supporter",
    desc: "Donated a total of ₹1,000 or more.",
  },
  Campaigner: {
    icon: <Rocket className="w-6 h-6 text-indigo-500 animate-float" />,
    label: "Campaigner",
    desc: "Started your first campaign.",
  },
  Fundraiser: {
    icon: <Trophy className="w-6 h-6 text-indigo-500 animate-icon-bounce" />,
    label: "Fundraiser",
    desc: "Started 3+ campaigns.",
  },
};

const ALL_BADGES = Object.keys(BADGE_DETAILS);

const shareLinks = (label, desc, badgelink = window.location.href) => {
  const text = encodeURIComponent(
    `🏅 I just unlocked the "${label}" badge on FuelFundr!\n${desc}\nCheck out the platform:`
  );
  return [
    {
      icon: <FaLinkedin className="w-4 h-4 text-slate-400 hover:text-indigo-500" />,
      label: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        badgelink
      )}`,
      tooltip: "Share to LinkedIn",
    },
    {
      icon: <FaTwitter className="w-4 h-4 text-slate-400 hover:text-indigo-500" />,
      label: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
        badgelink
      )}`,
      tooltip: "Share to Twitter",
    },
    {
      icon: <FaWhatsapp className="w-4 h-4 text-slate-400 hover:text-indigo-500" />,
      label: "WhatsApp",
      url: `https://wa.me/?text=${text} ${encodeURIComponent(badgelink)}`,
      tooltip: "Share to WhatsApp",
    },
  ];
};

const Badges = ({ badges = [] }) => (
  <div className="w-full max-w-4xl mx-auto select-none">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {ALL_BADGES.map((name) => {
        const hasBadge = badges.includes(name);
        const { icon, label, desc } = BADGE_DETAILS[name];
        return (
          <div
            key={name}
            className={`yc-card p-6 flex flex-col justify-between min-h-[160px] transition-all duration-200
            ${
              hasBadge
                ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5"
                : "bg-slate-100/50 dark:bg-slate-950/20 border-slate-200/50 dark:border-white/5 opacity-55 grayscale"
            }`}
          >
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center shrink-0">
                {icon}
              </div>
              
              <div>
                <h4 className={`font-bold text-base mb-1 ${hasBadge ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                  {label}
                </h4>
                <p className={`text-xs leading-relaxed ${hasBadge ? "text-slate-500 dark:text-slate-400" : "text-slate-400/80"}`}>
                  {desc}
                </p>
                {hasBadge && (
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    ✓ Unlocked
                  </span>
                )}
              </div>
            </div>

            {hasBadge && (
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/40">
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Share Badge
                </span>
                
                <div className="flex gap-2">
                  {shareLinks(label, desc).map((s) => (
                    <button
                      key={s.label}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-indigo-500 bg-white dark:bg-slate-900 shadow-sm transition flex items-center cursor-pointer"
                      title={s.tooltip}
                      onClick={() => window.open(s.url, "_blank")}
                      type="button"
                    >
                      {s.icon}
                      <span className="sr-only">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default Badges;
