import { Award, Gift, Rocket, Users, Trophy } from "lucide-react";
import { FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

// Badge config map for icon, description, etc.
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

const ALL_BADGES = Object.keys(BADGE_DETAILS);

// Helper for social links
const shareLinks = (label, desc, badgelink = window.location.href) => {
  const text = encodeURIComponent(
    `🏅 I just unlocked the "${label}" badge on Capstone!\n${desc}\nCheck out the platform:`
  );
  return [
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      label: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        badgelink
      )}`,
      tooltip: "Share badge to LinkedIn",
    },
    {
      icon: <FaTwitter className="w-5 h-5 text-blue-400" />,
      label: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
        badgelink
      )}`,
      tooltip: "Share badge to Twitter",
    },
    {
      icon: <FaWhatsapp className="w-5 h-5 text-green-500" />,
      label: "WhatsApp",
      url: `https://wa.me/?text=${text} ${encodeURIComponent(badgelink)}`,
      tooltip: "Share badge to WhatsApp",
    },
  ];
};

const Badges = ({ badges = [] }) => (
  <div className="w-full max-w-3xl mx-auto">
    <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent tracking-tight">
      Achievements
    </h2>
    <div className="grid sm:grid-cols-2 gap-8">
      {ALL_BADGES.map((name) => {
        const hasBadge = badges.includes(name);
        const { icon, label, desc } = BADGE_DETAILS[name];
        return (
          <div
            key={name}
            className={`rounded-2xl p-6 shadow-xl flex flex-col gap-3 bg-white/90 dark:bg-slate-900/95 border-2
            ${
              hasBadge
                ? "border-blue-200 dark:border-green-700"
                : "border-gray-200 dark:border-slate-800 opacity-50 grayscale"
            }`}
            style={{
              transition: "all 0.3s",
              filter: !hasBadge ? "grayscale(75%) blur(0.5px)" : "",
              boxShadow: hasBadge
                ? "0 6px 28px 0 rgb(67 210 255 / 10%)"
                : "0 2px 10px rgb(80 80 80 / 10%)",
            }}
          >
            <div className="flex gap-5 items-center">
              <span
                className={
                  "flex-shrink-0 " +
                  (hasBadge
                    ? "drop-shadow-md animate-pulse"
                    : "opacity-60 animate-none")
                }
                aria-label={label}
              >
                {icon}
              </span>
              <div>
                <div
                  className={
                    "font-bold text-xl mb-1 " +
                    (hasBadge
                      ? "text-blue-700 dark:text-green-300"
                      : "text-gray-400 dark:text-slate-500")
                  }
                >
                  {label}
                </div>
                <div
                  className={
                    "text-base " +
                    (hasBadge
                      ? "text-gray-700 dark:text-green-100"
                      : "text-gray-400 dark:text-slate-500")
                  }
                >
                  {desc}
                </div>
                {hasBadge && (
                  <div className="mt-1 text-green-500 text-xs font-bold uppercase tracking-wider">
                    Unlocked!
                  </div>
                )}
              </div>
            </div>
            {hasBadge && (
              <div className="flex gap-2 mt-2 flex-wrap items-center">
                <span className="text-[.98rem] font-semibold text-blue-600 dark:text-green-300 mr-2">
                  Share this badge:
                </span>
                {shareLinks(label, desc).map((s) => (
                  <button
                    key={s.label}
                    className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-green-950 shadow transition flex items-center"
                    title={s.tooltip}
                    onClick={() => window.open(s.url, "_blank")}
                    type="button"
                  >
                    {s.icon}
                    <span className="sr-only">{s.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
    <style>{`
      @keyframes wiggle {
        0%, 100% { transform: rotate(-7deg);}
        50% { transform: rotate(10deg);}
      }
      .animate-wiggle-slow { animation: wiggle 2.2s infinite;}
      @keyframes tada {
        0% { transform: scale(.98);}
        20% { transform: scale(1.15);}
        50% { transform: scale(.98);}
        70% { transform: scale(1.07);}
        100% { transform: scale(.98);}
      }
      .animate-tada { animation: tada 1.5s infinite;}
      .animate-spin-slow { animation: spin 3s linear infinite;}
      .animate-bounce { animation: bounce 0.7s infinite;}
      .animate-bounce-slow {animation: bounce 2s infinite;}
      @keyframes bounce {
        0%,100% { transform: translateY(0);}
        50% { transform: translateY(-12px);}
      }
    `}</style>
  </div>
);

export default Badges;
