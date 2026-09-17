import { useEffect } from "react";
import { useLeaderboardStore } from "../../store/leaderboardStore";
import { useAuthStore } from "../../store/authStore";
import { ArrowLeft, Trophy } from "lucide-react";
import ListCampaignNavbar from "../../components/navbar/ListCampaignNavbar";
import { useNavigate } from "react-router-dom";
import MinimalFooter from "../../components/footer/MinimalFooter";
import { getInitials } from "../../utils/initials";

const LeaderboardPage = () => {
  const { user } = useAuthStore();
  const { leaders, fetchLeaders, type, isLoading } = useLeaderboardStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaders(type);
  }, []);

  const handleTypeChange = (newType) => fetchLeaders(newType);
  const top3 = leaders ? leaders.slice(0, 3) : [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200 select-none">
      <ListCampaignNavbar />
      
      <div className="flex-grow w-full max-w-4xl mx-auto px-6 py-8">
        {/* Back navigation */}
        <div className="mb-6">
          <button
            onClick={() =>
              window.history.length > 1 ? navigate(-1) : navigate("/")
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-indigo-500 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer shadow-sm transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Hero banner card */}
        <div className="yc-card p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-center mb-8 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4 border border-amber-500/25">
            <Trophy className="text-amber-500 w-5 h-5" />
          </div>
          <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter mb-2">
            Campus Leaderboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wide max-w-md mx-auto">
            Celebrating the generosity, contributions, and badges unlocked by community change-makers.
          </p>
        </div>

        {/* Toggle controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => handleTypeChange("donation")}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition border cursor-pointer
              ${
                type === "donation"
                  ? "bg-slate-100 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-indigo-500/50 shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-indigo-500"
              }
            `}
            aria-pressed={type === "donation"}
          >
            🪙 Donors List
          </button>
          <button
            onClick={() => handleTypeChange("badges")}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition border cursor-pointer
              ${
                type === "badges"
                  ? "bg-slate-100 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-indigo-500/50 shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-indigo-500"
              }
            `}
            aria-pressed={type === "badges"}
          >
            🏅 Badge Earners
          </button>
        </div>

        {/* Top 3 Podium Cards */}
        {!isLoading && top3.length >= 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-end">
            {/* Sort top3 as: index 1 (second), index 0 (first), index 2 (third) to represent actual podium visual */}
            {[1, 0, 2].map((podIdx) => {
              const u = top3[podIdx];
              if (!u) return null;
              const borderTheme =
                podIdx === 0
                  ? "border-amber-500 bg-amber-500/5"
                  : podIdx === 1
                  ? "border-slate-400 bg-slate-400/5"
                  : "border-amber-700 bg-amber-700/5";
              const labelTheme =
                podIdx === 0
                  ? "text-amber-500"
                  : podIdx === 1
                  ? "text-slate-400"
                  : "text-amber-700";

              return (
                <div
                  key={u.userId}
                  className={`yc-card p-6 flex flex-col items-center justify-center text-center ${borderTheme} border-t-4 transition duration-200 ${
                    podIdx === 0 ? "md:py-8 shadow-md" : "md:py-6"
                  }`}
                >
                  <div className="h-12 w-12 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 flex items-center justify-center mb-3">
                    <span className="text-sm font-black text-slate-700 dark:text-slate-200">
                      {getInitials(u.name)}
                    </span>
                  </div>
                  
                  <span className={`font-black text-sm block ${labelTheme}`}>
                    {["🥇 #1", "🥈 #2", "🥉 #3"][podIdx]} {u.name}
                  </span>
                  
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mt-1">
                    {type === "donation"
                      ? `₹${u.totalDonated.toLocaleString()}`
                      : `${u.badgeCount} Badges`}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Leaderboard Table Grid */}
        <div className="yc-card overflow-hidden">
          <div className="px-6 py-4 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/10">
            Rank Standings
          </div>
          
          {isLoading ? (
            <div className="p-16 text-center text-slate-400 font-mono text-xs">
              Loading Leaderboard Standings...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-150 dark:border-slate-800/60 bg-slate-50/20 dark:bg-slate-900/5">
                    <th className="px-6 py-3.5 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Rank</th>
                    <th className="px-6 py-3.5 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Contributor</th>
                    <th className="px-6 py-3.5 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {type === "donation" ? "Total Donated" : "Badges Earned"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaders.slice(0, 10).map((leader, index) => {
                    const isCurrentUser = user && leader.userId === user._id;
                    const isTop3 = index < 3;
                    return (
                      <tr
                        key={leader.userId}
                        className={`border-b border-slate-100 dark:border-slate-800/40 transition hover:bg-slate-50/50 dark:hover:bg-slate-900/5
                          ${
                            isCurrentUser
                              ? "bg-indigo-500/5 dark:bg-indigo-500/5 font-bold"
                              : ""
                          }
                        `}
                      >
                        <td className="px-6 py-3.5 font-bold text-sm">
                          {isTop3 ? (
                            <span className="text-base">
                              {["🥇", "🥈", "🥉"][index]}
                            </span>
                          ) : (
                            <span className="font-mono text-slate-500 dark:text-slate-400">
                              #{index + 1}
                            </span>
                          )}
                        </td>
                        
                        <td className="px-6 py-3.5 flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-black text-slate-700 dark:text-slate-200">
                              {getInitials(leader.name)}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-250">
                            {isCurrentUser ? "👤 You" : leader.name}
                          </span>
                        </td>
                        
                        <td
                          className={`px-6 py-3.5 font-mono font-bold text-xs ${
                            type === "donation"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-indigo-600 dark:text-indigo-400"
                          }`}
                        >
                          {type === "donation"
                            ? `₹${leader.totalDonated.toLocaleString()}`
                            : `${leader.badgeCount} Badges`}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Sticky Row if current user is not in top 10 */}
                  {(() => {
                    const userIndex = leaders.findIndex(
                      (l) => user && String(l.userId) === String(user._id)
                    );
                    if (user && userIndex >= 10) {
                      const leader = leaders[userIndex];
                      return (
                        <tr
                          key="curr-user-sticky"
                          className="sticky bottom-0 bg-indigo-500/5 dark:bg-indigo-500/5 font-bold border-t-2 border-indigo-500 shadow-2xl"
                        >
                          <td className="px-6 py-3.5">
                            <span className="font-mono text-indigo-500">
                              #{userIndex + 1}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 flex items-center justify-center shrink-0">
                              <span className="text-[10px] font-black text-slate-700 dark:text-slate-200">
                                {getInitials(leader.name)}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-250">
                              👤 You (Current Rank)
                            </span>
                          </td>
                          <td
                            className={`px-6 py-3.5 font-mono font-bold text-xs ${
                              type === "donation"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-indigo-600 dark:text-indigo-400"
                            }`}
                          >
                            {type === "donation"
                              ? `₹${leader.totalDonated.toLocaleString()}`
                              : `${leader.badgeCount} Badges`}
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })()}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      <MinimalFooter />
    </div>
  );
};

export default LeaderboardPage;
