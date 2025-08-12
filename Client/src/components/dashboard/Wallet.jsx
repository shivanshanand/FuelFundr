import React from "react";
import { ArrowDownLeft, ArrowUpRight, PlusCircle, Loader2 } from "lucide-react";
import { formatDate } from "../../utils/date";

const Wallet = ({ balance = 0, transactions = [], loading, onAddFunds }) => (
  <div className="w-full max-w-5xl mx-auto">
    <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent">
      Wallet
    </h2>
    {/* Balance + Add Funds */}
    <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-7 w-full">
      <div className="flex-1 flex flex-col items-center md:items-start">
        <div className="text-lg text-blue-800 dark:text-green-300 font-semibold mb-1">
          Wallet Balance
        </div>
        <div className="text-4xl font-extrabold text-green-500 dark:text-green-400 tracking-wide mb-0.5">
          ₹{balance.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Add funds to back or create campaigns.
        </div>
      </div>
      <button
        onClick={onAddFunds}
        disabled={loading}
        className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-green-400 to-blue-600 text-white font-bold text-lg shadow hover:from-green-500 hover:to-blue-700 transition whitespace-nowrap"
      >
        <PlusCircle className="w-6 h-6" />
        {loading ? "Processing..." : "Add Funds"}
      </button>
    </div>

    {/* Transactions */}
    <div className="rounded-2xl border border-blue-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow overflow-hidden mb-6">
      <div className="px-8 py-5 text-blue-700 dark:text-green-300 text-xl font-bold bg-blue-50 dark:bg-slate-900/70">
        Recent Transactions
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin w-9 h-9 text-green-400" />
        </div>
      ) : !transactions?.length ? (
        <div className="flex flex-col items-center py-14">
          <span className="text-5xl mb-2">🪙</span>
          <div className="text-lg font-semibold text-blue-700 dark:text-green-300">
            No recent transactions yet
          </div>
          <div className="text-gray-600 dark:text-gray-300 mt-2">
            Top up your wallet or make your first contribution!
          </div>
        </div>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="px-8 py-4 text-base text-blue-700 dark:text-green-300 font-semibold">
                Type
              </th>
              <th className="px-8 py-4 text-base text-blue-700 dark:text-green-300 font-semibold">
                Amount
              </th>
              <th className="px-8 py-4 text-base text-blue-700 dark:text-green-300 font-semibold">
                Description
              </th>
              <th className="px-8 py-4 text-base text-blue-700 dark:text-green-300 font-semibold">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, idx) => {
              // WITHDRAWAL or ADD_FUNDS = green/icon/added, others = red/spent
              const isAdded = t.type === "ADD_FUNDS" || t.type === "WITHDRAWAL";
              const label =
                t.type === "ADD_FUNDS"
                  ? "Added"
                  : t.type === "WITHDRAWAL"
                  ? "Withdrew"
                  : "Spent";

              return (
                <tr
                  key={idx}
                  className={
                    idx % 2 === 0
                      ? "bg-white dark:bg-slate-900"
                      : "bg-blue-50/40 dark:bg-slate-800/60"
                  }
                >
                  <td className="px-8 py-4 flex items-center gap-2">
                    {isAdded ? (
                      <ArrowDownLeft className="w-5 h-5 text-green-500" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-500" />
                    )}
                    <span
                      className={`font-semibold ${
                        isAdded ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {label}
                    </span>
                  </td>
                  <td className="px-8 py-4 font-bold text-lg whitespace-nowrap">
                    <span
                      className={
                        isAdded
                          ? "text-green-700 dark:text-green-300"
                          : "text-red-600 dark:text-red-300"
                      }
                    >
                      +₹{t.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-gray-700 dark:text-gray-300">
                    {t.description ||
                      (t.type === "ADD_FUNDS"
                        ? "Wallet top-up"
                        : t.type === "WITHDRAWAL"
                        ? "Withdrawn from campaign"
                        : "Wallet debit")}
                  </td>
                  <td className="px-8 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {formatDate(t.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

export default Wallet;
