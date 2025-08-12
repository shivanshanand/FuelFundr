import { Link } from "react-router-dom";
import { Calendar, Rocket, Code, Heart, Lightbulb, Users } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";

const categoryStyle = {
  Startup: { color: "bg-blue-700/90", icon: Rocket, label: "Startup" },
  Hackathon: { color: "bg-green-500/90", icon: Code, label: "Hackathon" },
  Project: { color: "bg-purple-600/90", icon: Lightbulb, label: "Project" },
  "Social Cause": {
    color: "bg-red-600/80",
    icon: Heart,
    label: "Social Cause",
  },
  Creative: {
    color: "bg-yellow-400 text-black/90",
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
    <div
      className={`
        rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 
        shadow-lg flex flex-col relative overflow-hidden
        transition hover:-translate-y-1 hover:shadow-2xl duration-200 min-h-[460px]
      `}
    >
      {/* Status badge */}
      {c.status === "fulfilled" && (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded font-bold shadow-lg z-10">
          Goal Reached
        </div>
      )}
      {c.status === "closed" && (
        <div className="absolute top-4 right-4 bg-gray-500 text-white text-xs px-3 py-1 rounded font-bold shadow-lg z-10">
          Closed
        </div>
      )}

      {/* Image */}
      <img
        src={c.image || defaultImage}
        alt={c.title}
        className="w-full h-40 object-cover object-center rounded-t-2xl bg-gradient-to-br from-blue-100 to-blue-300 dark:from-slate-800 dark:to-blue-950"
        loading="lazy"
      />

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 pt-5 pb-6 space-y-2">
        {/* Category + Deadline */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`
              flex items-center gap-2 px-3 py-1 text-xs rounded-full font-semibold shadow-sm
              ${cat.color || "bg-gray-400 text-white"}
            `}
          >
            <Icon className="w-4 h-4" />
            {cat.label || c.category}
          </span>
          <span className="flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-green-300 to-blue-200 dark:from-blue-900 dark:to-green-800 text-blue-900 dark:text-green-200 text-xs font-medium shadow-sm">
            <Calendar className="w-3 h-3 mr-1" />
            {daysLeft(c.deadline)}
          </span>
        </div>

        {/* Owner Row */}
        <div className="mb-2 text-xs text-gray-500 dark:text-gray-300 font-medium">
          Owner:{" "}
          <span className="text-blue-700 dark:text-blue-200 font-semibold">
            {c.createdBy?.name || "Unknown"}
          </span>
        </div>

        {/* Title */}
        <div className="text-lg font-bold text-blue-900 dark:text-green-200 truncate mb-0.5">
          {c.title}
        </div>

        {/* Progress Row */}
        <div className="mb-2 pt-2 border-t border-dashed border-blue-100 dark:border-slate-800">
          <div className="flex justify-between items-center text-sm font-semibold mb-1 mt-1">
            <span className="text-green-700 dark:text-green-300">
              ₹{(c.amountRaised || 0).toLocaleString()} raised
            </span>
            <span className="text-blue-700 dark:text-green-400">
              {percent}%
            </span>
          </div>
          <ProgressBar raised={c.amountRaised} target={c.targetAmount} />
        </div>

        {/* Stats Row */}
        <div className="flex justify-between items-center gap-2 py-3 mb-2 border-t border-b border-blue-50 dark:border-slate-800">
          <div className="w-1/3 flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1">Goal</span>
            <span className="text-blue-900 dark:text-green-200 font-bold">
              ₹{c.targetAmount?.toLocaleString()}
            </span>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1">Left</span>
            <span className="text-yellow-600 dark:text-yellow-300 font-bold">
              ₹{left.toLocaleString()}
            </span>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1 flex items-center gap-1">
              <Users className="w-4 h-4 inline" /> Backers
            </span>
            <span className="text-blue-700 dark:text-green-300 font-bold">
              {c.donors && c.donors.length > 0
                ? `${c.donors.length} backer${c.donors.length > 1 ? "s" : ""}`
                : "0"}
            </span>
          </div>
        </div>

        {/* Details Button */}
        <Link
          to={`/campaigns/${c._id}`}
          className="
            w-full inline-block text-center mt-auto py-2 rounded-xl font-semibold text-white
            border-2 border-blue-700
            bg-gradient-to-r from-blue-700 to-green-400
            transition-all duration-300
            shadow hover:from-blue-800 hover:to-green-500
            focus:outline-none focus:ring-2 focus:ring-green-300
          "
        >
          <span className="relative z-10 transition-colors duration-200">
            View Details
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
