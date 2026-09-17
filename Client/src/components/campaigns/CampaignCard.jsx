import { Link } from "react-router-dom";
import { Calendar, Rocket, Code, Heart, Lightbulb, Users, Check } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";

const categoryStyle = {
  Startup: { color: "text-indigo-500 bg-indigo-500/5 border-indigo-500/10", icon: Rocket, label: "Startup" },
  Hackathon: { color: "text-emerald-500 bg-emerald-500/5 border-emerald-500/10", icon: Code, label: "Hackathon" },
  Project: { color: "text-amber-500 bg-amber-500/5 border-amber-500/10", icon: Lightbulb, label: "Project" },
  "Social Cause": {
    color: "text-rose-500 bg-rose-500/5 border-rose-500/10",
    icon: Heart,
    label: "Social Cause",
  },
  Creative: {
    color: "text-cyan-500 bg-cyan-500/5 border-cyan-500/10",
    icon: Users,
    label: "Creative",
  },
};

function daysLeft(deadline) {
  const end = new Date(deadline);
  const now = new Date();
  const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  return diff > 0 ? `${diff}d left` : "Ended";
}

const defaultImage =
  "https://res.cloudinary.com/demo/image/upload/v1712322333/default-campaign.jpg";

const CampaignCard = ({ c }) => {
  const cat = categoryStyle[c.category] || {};
  const Icon = cat.icon || Calendar;
  const left = Math.max(0, c.targetAmount - (c.amountRaised || 0));
  const percent = c.targetAmount
    ? Math.round(((c.amountRaised || 0) / c.targetAmount) * 100)
    : 0;

  return (
    <div className="yc-card yc-card-hover flex flex-col relative overflow-hidden min-h-[470px]">
      {/* Status badge */}
      {c.status === "fulfilled" && (
        <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-mono font-bold px-2 py-1 rounded shadow-sm z-10 flex items-center gap-1">
          <Check className="w-3 h-3" /> GOAL REACHED
        </div>
      )}
      {c.status === "closed" && (
        <div className="absolute top-4 right-4 bg-slate-500 text-white text-[10px] font-mono font-bold px-2 py-1 rounded shadow-sm z-10">
          CLOSED
        </div>
      )}

      {/* Campaign Image */}
      <img
        src={c.image || defaultImage}
        alt={c.title}
        width={400}
        height={160}
        className="w-full h-40 object-cover object-center bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/40"
        loading="lazy"
      />

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 pt-5 pb-6">
        {/* Category + Deadline */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`
              flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full font-semibold border
              ${cat.color || "text-slate-500 bg-slate-500/5 border-slate-500/10"}
            `}
          >
            <Icon className="w-3.5 h-3.5" />
            {cat.label || c.category}
          </span>
          <span className="flex items-center px-2 py-1 rounded-full border border-slate-200/50 dark:border-white/5 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-[10px] font-mono shadow-sm">
            <Calendar className="w-3 h-3 mr-1 text-slate-400" />
            {daysLeft(c.deadline)}
          </span>
        </div>

        {/* Creator Name */}
        <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
          CREATED BY <span className="font-bold text-slate-700 dark:text-slate-300">{c.createdBy?.name || "Unknown"}</span>
        </div>

        {/* Title */}
        <h4 className="text-lg font-black text-slate-950 dark:text-white tracking-tight mb-4 truncate">
          {c.title}
        </h4>

        {/* Progress details */}
        <div className="mb-4 pt-4 border-t border-dashed border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs font-mono font-bold mb-1.5">
            <span className="text-slate-700 dark:text-slate-300">
              ₹{(c.amountRaised || 0).toLocaleString()} raised
            </span>
            <span className="text-indigo-500 dark:text-indigo-400">
              {percent}%
            </span>
          </div>
          <ProgressBar raised={c.amountRaised} target={c.targetAmount} />
        </div>

        {/* Statistics Columns */}
        <div className="grid grid-cols-3 py-3 border-y border-slate-200/50 dark:border-slate-800/50 mb-6 text-center">
          <div>
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Goal</span>
            <span className="text-slate-800 dark:text-slate-200 font-mono font-bold text-xs">
              ₹{c.targetAmount?.toLocaleString()}
            </span>
          </div>
          <div className="border-x border-slate-100 dark:border-slate-800/40">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Remaining</span>
            <span className="text-slate-800 dark:text-slate-200 font-mono font-bold text-xs">
              ₹{left.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Backers</span>
            <span className="text-slate-800 dark:text-slate-200 font-mono font-bold text-xs">
              {c.donors && c.donors.length > 0 ? c.donors.length : 0}
            </span>
          </div>
        </div>

        {/* View Details CTA */}
        <Link
          to={`/campaigns/${c._id}`}
          className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 cursor-pointer shadow-sm shadow-indigo-500/10 block mt-auto"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
