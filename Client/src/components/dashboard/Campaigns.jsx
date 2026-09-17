import { Loader2, Target, Users, Calendar, Eye, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Campaigns = ({ campaigns = [], loading }) => {
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-80">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
      </div>
    );
  }

  if (!campaigns.length) {
    return (
      <div className="w-full flex flex-col items-center py-20 text-center select-none">
        <span className="text-4xl mb-3">🎯</span>
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
          No Campaigns Launched Yet
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed mb-6">
          You haven't created any campaigns. Share your student projects, hackathon ideas, or startups!
        </p>
        <Link
          to="/campaigns/create"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition duration-150 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Your First Campaign</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => {
          const percent =
            c.targetAmount > 0
              ? Math.min(
                  100,
                  Math.round((c.amountRaised / c.targetAmount) * 100)
                )
              : 0;

          return (
            <div
              key={c._id}
              className="yc-card yc-card-hover flex flex-col overflow-hidden"
            >
              {/* Cover Photo */}
              <div className="h-36 w-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-250/20">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                    <Target className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="flex-1 px-5 py-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base tracking-tight truncate flex-1">
                    {c.title}
                  </h4>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider shrink-0
                      ${
                        c.status === "open"
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                          : c.status === "closed"
                          ? "bg-slate-500/10 text-slate-500 border border-slate-500/25"
                          : "bg-indigo-500/10 text-indigo-550 border border-indigo-500/20"
                      }
                    `}
                  >
                    {c.status}
                  </span>
                </div>

                {/* Info row */}
                <div className="flex flex-col gap-1.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/40 pt-3">
                  <div className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    <span>Goal: ₹{c.targetAmount?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{c.donors ? c.donors.length : 0} Backers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {c.deadline
                        ? new Date(c.deadline).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "No deadline"}
                    </span>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="mt-2">
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-slate-700 dark:text-slate-350">
                      ₹{c.amountRaised?.toLocaleString() || 0} Raised
                    </span>
                    <span className="text-indigo-500">{percent}%</span>
                  </div>
                </div>

                {/* Action button */}
                <Link
                  to={`/campaigns/${c._id}`}
                  className="w-full mt-4 flex items-center justify-center gap-1 px-3 py-2 border border-slate-200 dark:border-white/10 rounded-lg bg-white/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-xs hover:border-indigo-500 transition duration-150"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Campaigns;
