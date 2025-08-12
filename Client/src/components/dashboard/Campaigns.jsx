import React from "react";
import { Loader2, Target, Users, Calendar, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Campaigns = ({ campaigns = [], loading }) => {
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-80">
        <Loader2 className="animate-spin w-10 h-10 text-blue-700 dark:text-green-300" />
      </div>
    );
  }

  if (!campaigns.length) {
    return (
      <div className="w-full flex flex-col items-center py-20">
        <span className="text-[56px] mb-2 animate-bounce">🎯</span>
        <div className="text-xl text-blue-800 dark:text-green-300 font-bold mb-2">
          No Campaigns Yet
        </div>
        <div className="text-lg text-gray-500 dark:text-gray-300 text-center mb-4">
          You haven&apos;t started any campaigns.
          <br />
          <span className="text-base font-semibold text-blue-700 dark:text-green-200">
            Create one now and make an impact!
          </span>
        </div>
        <Link
          to="/create"
          className="mt-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-green-400 to-blue-600 text-white font-bold text-lg shadow hover:from-green-500 hover:to-blue-700 transition"
        >
          + Start a Campaign
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-2xl text-center md:text-3xl font-extrabold mb-8 bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent">
        My Campaigns
      </h2>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
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
              className="rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-blue-200 dark:border-slate-800 shadow-lg flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="h-40 w-full overflow-hidden bg-gradient-to-tr from-blue-50 via-green-50 to-blue-100 dark:from-slate-800 dark:to-green-950">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl text-blue-300 dark:text-green-400 opacity-40">
                    <Target />
                  </div>
                )}
              </div>
              <div className="flex-1 px-6 py-6 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xl font-bold text-blue-900 dark:text-green-200 truncate max-w-[70%]">
                    {c.title}
                  </h3>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide
                      ${
                        c.status === "open"
                          ? "bg-green-100 text-green-700"
                          : c.status === "closed"
                          ? "bg-red-100 text-red-700"
                          : c.status === "fulfilled"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </span>
                </div>
                {/* Progress/Stats Row */}
                <div className="flex flex-row flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  <span className="flex items-center gap-1 min-w-0">
                    <Target className="w-4 h-4" />₹
                    {c.targetAmount?.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 min-w-0">
                    <Users className="w-4 h-4" />
                    {c.donors ? (
                      <>
                        <span className="truncate">{c.donors.length}</span>
                        <span className="ml-0.5 hidden xs:inline">Donors</span>
                      </>
                    ) : (
                      <>
                        0{" "}
                        <span className="ml-0.5 hidden xs:inline">Donors</span>
                      </>
                    )}
                  </span>
                  <span className="flex items-center gap-1 min-w-0">
                    <Calendar className="w-4 h-4" />
                    {c.deadline
                      ? new Date(c.deadline).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "No deadline"}
                  </span>
                </div>
                <div className="w-full h-3 bg-blue-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner mt-2 mb-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-700 to-green-400"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-base font-bold">
                  <span className="text-green-700 dark:text-green-400">
                    ₹{c.amountRaised?.toLocaleString() || 0} Raised
                  </span>
                  <span className="text-blue-700 dark:text-green-300">
                    {percent}%
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-blue-100 dark:border-slate-800 bg-white/60 dark:bg-slate-900/70">
                <Link
                  to={`/campaigns/${c._id}`}
                  className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-700 to-green-400 text-white font-semibold rounded-lg shadow text-sm hover:from-blue-800 hover:to-green-700"
                  title="View"
                >
                  <Eye className="w-4 h-4" />
                  View
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
