import React from "react";
import { Loader2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Donations = ({ donations = [], loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <Loader2 className="animate-spin w-10 h-10 text-green-400" />
      </div>
    );
  }

  if (!donations.length) {
    return (
      <div className="w-full flex flex-col items-center py-14">
        <span className="text-5xl mb-2 animate-bounce">🪙</span>
        <div className="text-xl text-blue-800 dark:text-green-300 font-bold mb-1">
          No Contributions Yet
        </div>
        <div className="text-lg text-gray-600 dark:text-gray-300 text-center">
          You haven&apos;t donated to any campaigns yet.
          <br />
          <span className="text-base font-semibold text-blue-700 dark:text-green-200">
            Back a project to support the community!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-green-700 to-blue-400 bg-clip-text text-transparent">
        My Contributions
      </h2>

      {/* Mobile: Card Grid */}
      <div className="grid gap-5 md:hidden">
        {donations.map((d, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-blue-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow px-5 py-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-4 mb-2">
              {d.campaign.image && (
                <img
                  src={d.campaign.image}
                  alt={d.campaign.title}
                  className="w-14 h-14 object-cover rounded-lg border border-blue-100 shadow"
                />
              )}
              <Link
                to={`/campaigns/${d.campaign._id}`}
                className="font-bold text-blue-800 dark:text-green-200 hover:underline truncate text-base"
              >
                {d.campaign.title}
              </Link>
            </div>
            <div className="flex flex-wrap justify-between gap-3">
              <div className="text-green-700 dark:text-green-300 font-semibold">
                ₹{d.amount.toLocaleString()}
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-sm">
                {new Date(d.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <Link
                to={`/campaigns/${d.campaign._id}`}
                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-700 to-green-400 text-white rounded-lg text-xs font-semibold shadow hover:from-blue-800 hover:to-green-700"
                title="View Campaign"
              >
                <ArrowUpRight className="w-4 h-4" />
                View
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="rounded-2xl border border-blue-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow overflow-hidden hidden md:block">
        <table className="w-full text-left">
          <thead className="bg-blue-50 dark:bg-slate-800/80 text-blue-700 dark:text-green-300">
            <tr>
              <th className="px-8 py-5 text-lg font-semibold">Campaign</th>
              <th className="px-8 py-5 text-lg font-semibold">Amount</th>
              <th className="px-8 py-5 text-lg font-semibold">Date</th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d, idx) => (
              <tr
                key={idx}
                className={
                  idx % 2 === 0
                    ? "bg-white dark:bg-slate-900"
                    : "bg-blue-50/40 dark:bg-slate-800/60"
                }
              >
                <td className="px-8 py-5 flex items-center gap-4 min-w-0">
                  {d.campaign.image && (
                    <img
                      src={d.campaign.image}
                      alt={d.campaign.title}
                      className="w-14 h-14 object-cover rounded-lg border border-blue-100 shadow"
                    />
                  )}
                  <Link
                    to={`/campaigns/${d.campaign._id}`}
                    className="font-bold text-blue-800 dark:text-green-200 hover:underline truncate text-lg"
                  >
                    {d.campaign.title}
                  </Link>
                </td>
                <td className="px-8 py-5 font-bold text-green-700 dark:text-green-300 whitespace-nowrap text-lg">
                  ₹{d.amount.toLocaleString()}
                </td>
                <td className="px-8 py-5 text-gray-700 dark:text-gray-300 whitespace-nowrap text-md">
                  {new Date(d.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-8 py-5">
                  <Link
                    to={`/campaigns/${d.campaign._id}`}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-700 to-green-400 text-white rounded-lg text-sm font-semibold shadow hover:from-blue-800 hover:to-green-700"
                    title="View Campaign"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donations;
