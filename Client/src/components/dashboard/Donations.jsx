import { Loader2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Donations = ({ donations = [], loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
      </div>
    );
  }

  if (!donations.length) {
    return (
      <div className="w-full flex flex-col items-center py-20 text-center select-none">
        <span className="text-4xl mb-3">🪙</span>
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
          No Contributions Yet
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
          You haven't backed any campaigns yet. Support campus change-makers and earn rewards!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      {/* Mobile: Card Grid */}
      <div className="grid gap-4 md:hidden">
        {donations.map((d, idx) => (
          <div
            key={idx}
            className="yc-card p-5 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              {d.campaign.image && (
                <img
                  src={d.campaign.image}
                  alt={d.campaign.title}
                  className="w-12 h-12 object-cover rounded-lg border border-slate-200 dark:border-slate-800"
                />
              )}
              <Link
                to={`/campaigns/${d.campaign._id}`}
                className="font-bold text-slate-800 dark:text-white hover:text-indigo-500 transition-colors truncate text-sm flex-1"
              >
                {d.campaign.title}
              </Link>
            </div>
            
            <div className="flex items-center justify-between mt-1 border-t border-slate-100 dark:border-slate-800/40 pt-3">
              <div className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                ₹{d.amount.toLocaleString()}
              </div>
              <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                {new Date(d.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <Link
                to={`/campaigns/${d.campaign._id}`}
                className="flex items-center gap-1 px-2.5 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg text-[10px] font-bold hover:border-indigo-500 transition"
              >
                <span>View</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="yc-card overflow-hidden hidden md:block">
        <div className="px-6 py-4 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/10">
          Campaign Backing History
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-150 dark:border-slate-800/60 bg-slate-50/20 dark:bg-slate-900/5">
                <th className="px-6 py-3.5 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Campaign Title
                </th>
                <th className="px-6 py-3.5 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Amount Contributed
                </th>
                <th className="px-6 py-3.5 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Date
                </th>
                <th className="px-6 py-3.5"></th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-100 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/5 transition-colors"
                >
                  <td className="px-6 py-3.5 flex items-center gap-3">
                    {d.campaign.image && (
                      <img
                        src={d.campaign.image}
                        alt={d.campaign.title}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-800"
                      />
                    )}
                    <Link
                      to={`/campaigns/${d.campaign._id}`}
                      className="font-bold text-slate-800 dark:text-white hover:text-indigo-500 transition-colors truncate max-w-[240px] text-sm"
                    >
                      {d.campaign.title}
                    </Link>
                  </td>
                  <td className="px-6 py-3.5 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    ₹{d.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-3.5 text-xs font-mono text-slate-400 dark:text-slate-500 whitespace-nowrap">
                    {new Date(d.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <Link
                      to={`/campaigns/${d.campaign._id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold hover:border-indigo-500 transition shadow-sm bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
                    >
                      <span>View</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Donations;
