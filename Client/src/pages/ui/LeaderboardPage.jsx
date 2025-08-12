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
    // eslint-disable-next-line
  }, []);

  const handleTypeChange = (newType) => fetchLeaders(newType);
  const top3 = leaders ? leaders.slice(0, 3) : [];

  return (
    <>
      <ListCampaignNavbar />
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 transition-colors">
        {/* Back button and spacing */}
        <div className="w-full flex relative z-10">
          <div className="pl-3 pt-6 sm:pl-6 sm:pt-8">
            <button
              onClick={() =>
                window.history.length > 1 ? navigate(-1) : navigate("/")
              }
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold shadow hover:from-blue-800 hover:to-green-700 transition text-sm md:text-base"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center glassy rounded-2xl shadow-lg bg-white/90 dark:bg-slate-900/90 py-8 sm:py-12 px-4 sm:px-6 mb-10 mt-2 sm:mt-4 border border-blue-200 dark:border-slate-800 min-h-[14rem] sm:min-h-[16rem]">
          <Trophy className="mx-auto text-yellow-400 w-12 h-12 mb-3" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent mb-6 drop-shadow tracking-tight leading-[1.5]">
            Campaign Leaderboard
          </h1>
          <p className="text-base md:text-lg text-blue-800 dark:text-green-300">
            Celebrate the generosity and achievements of our top community
            members!
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-2 pb-12">
          {/* Leaderboard Type Toggle */}
          <div className="flex justify-center gap-4 mb-7">
            <button
              onClick={() => handleTypeChange("donation")}
              className={`px-4 py-2 rounded-xl font-bold shadow text-base transition border
                ${
                  type === "donation"
                    ? "bg-gradient-to-r from-blue-700 to-green-400 text-white border-blue-300 scale-105"
                    : "bg-white/80 dark:bg-slate-900/80 text-blue-700 dark:text-green-300 border-blue-100 dark:border-slate-700 hover:bg-blue-100 dark:hover:bg-blue-800"
                }
              `}
              aria-pressed={type === "donation"}
            >
              🪙 Top Donors
            </button>
            <button
              onClick={() => handleTypeChange("badges")}
              className={`px-4 py-2 rounded-xl font-bold shadow text-base transition border
                ${
                  type === "badges"
                    ? "bg-gradient-to-r from-green-400 to-blue-600 text-white border-green-300 scale-105"
                    : "bg-white/80 dark:bg-slate-900/80 text-green-700 dark:text-green-300 border-blue-100 dark:border-slate-700 hover:bg-green-100 dark:hover:bg-green-900"
                }
              `}
              aria-pressed={type === "badges"}
            >
              🏅 Top Badge Earners
            </button>
          </div>

          {/* Top 3 Podium */}
          {!isLoading && top3.length >= 1 && (
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
              {top3.map((u, idx) => (
                <div
                  key={u.userId}
                  className={`
                    flex flex-col items-center px-5 py-4 rounded-2xl border
                    shadow bg-white/90 dark:bg-slate-900/90
                    ${
                      idx === 0
                        ? "border-yellow-400 scale-110"
                        : idx === 1
                        ? "border-slate-400"
                        : "border-yellow-800"
                    }
                  `}
                >
                  <div
                    className={`rounded-full shadow-lg border-4 ${
                      idx === 0
                        ? "border-yellow-400"
                        : idx === 1
                        ? "border-slate-400"
                        : "border-yellow-800"
                    }`}
                  >
                    <div className="h-14 w-14 flex items-center justify-center rounded-full border-2 border-blue-300 dark:border-green-200 shadow bg-gradient-to-br from-blue-200 to-green-200 dark:from-green-900 dark:to-blue-900 select-none">
                      <span className="text-xl font-extrabold text-blue-700 dark:text-green-200">
                        {getInitials(u.name)}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`font-bold mt-2 ${
                      idx === 0
                        ? "text-yellow-400"
                        : idx === 1
                        ? "text-blue-500"
                        : "text-yellow-800"
                    }`}
                  >
                    {["🥇", "🥈", "🥉"][idx]} {u.name}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {type === "donation"
                      ? `₹${u.totalDonated}`
                      : `${u.badgeCount} badges`}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Leaderboard Table */}
          <div className="overflow-x-auto mb-8 rounded-2xl shadow bg-white/90 dark:bg-slate-900/90 border border-blue-200 dark:border-slate-800">
            {isLoading ? (
              <div className="p-8 text-center text-blue-700 dark:text-green-300 text-xl animate-pulse">
                Loading...
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-green-300 text-base">
                  <tr>
                    <th className="px-4 py-3 font-bold">Rank</th>
                    <th className="px-4 py-3 font-bold">User</th>
                    <th className="px-4 py-3 font-bold">
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
                        className={`transition ${
                          isCurrentUser
                            ? "bg-yellow-100 dark:bg-yellow-800 bg-opacity-80 font-semibold"
                            : index % 2 === 0
                            ? "bg-white/80 dark:bg-slate-900/90"
                            : "bg-blue-50/40 dark:bg-slate-800/60"
                        }`}
                      >
                        <td className="px-4 py-2 font-bold">
                          {isTop3 ? (
                            <span
                              className={`text-xl ${
                                [
                                  "text-yellow-400",
                                  "text-blue-500",
                                  "text-yellow-800",
                                ][index]
                              }`}
                            >
                              {["🥇", "🥈", "🥉"][index]}
                            </span>
                          ) : (
                            <span className="text-blue-800 dark:text-green-200 font-bold">
                              {index + 1}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2 flex items-center gap-2">
                          <div className="h-14 w-14 flex items-center justify-center rounded-full border-2 border-blue-300 dark:border-green-200 shadow bg-gradient-to-br from-blue-200 to-green-200 dark:from-green-900 dark:to-blue-900 select-none">
                            <span className="text-xl font-extrabold text-blue-700 dark:text-green-200">
                              {getInitials(leader.name)}
                            </span>
                          </div>
                          <span>
                            {isCurrentUser ? (
                              <span className="text-green-700 dark:text-yellow-200">
                                👤 You
                              </span>
                            ) : (
                              <span className="text-blue-800 dark:text-green-200 font-medium">
                                {leader.name}
                              </span>
                            )}
                          </span>
                        </td>
                        <td
                          className={`px-4 py-2 font-semibold ${
                            type === "donation"
                              ? "text-green-700 dark:text-green-300"
                              : "text-blue-700 dark:text-green-200"
                          }`}
                        >
                          {type === "donation"
                            ? `₹${leader.totalDonated.toLocaleString()}`
                            : leader.badgeCount}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Sticky row for current user if not already visible in top 10 */}
                  {(() => {
                    const userIndex = leaders.findIndex(
                      (l) => user && String(l.userId) === String(user._id)
                    );
                    // curruser not in top 10
                    if (user && userIndex >= 10) {
                      const leader = leaders[userIndex];
                      return (
                        <tr
                          key="curr-user-sticky"
                          className="sticky bottom-0 z-10 bg-yellow-100 dark:bg-yellow-800 bg-opacity-90 font-bold shadow-2xl border-t-4 border-blue-300 dark:border-yellow-300 "
                        >
                          <td className="px-4 py-2">
                            <span className="text-blue-800 dark:text-green-200 font-bold">
                              {userIndex + 1}
                            </span>
                          </td>
                          <td className="px-4 py-2 flex items-center gap-2">
                            <div className="h-14 w-14 flex items-center justify-center rounded-full border-2 border-blue-300 dark:border-green-200 shadow bg-gradient-to-br from-blue-200 to-green-200 dark:from-green-900 dark:to-blue-900 select-none">
                              <span className="text-xl font-extrabold text-blue-700 dark:text-green-200">
                                {getInitials(leader.name)}
                              </span>
                            </div>
                            <span className="text-green-700 dark:text-yellow-200">
                              👤 You
                            </span>
                          </td>
                          <td
                            className={`px-4 py-2 font-semibold ${
                              type === "donation"
                                ? "text-green-700 dark:text-green-300"
                                : "text-blue-700 dark:text-green-200"
                            }`}
                          >
                            {type === "donation"
                              ? `₹${leader.totalDonated.toLocaleString()}`
                              : leader.badgeCount}
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })()}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <MinimalFooter />
    </>
  );
};

export default LeaderboardPage;
