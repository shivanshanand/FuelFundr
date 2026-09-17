import { ArrowDownLeft, ArrowUpRight, Plus, Loader2 } from "lucide-react";
import { formatDate } from "../../utils/date";

const Wallet = ({ balance = 0, transactions = [], loading, onAddFunds }) => (
  <div className="w-full max-w-4xl mx-auto select-none">
    {/* Balance + Add Funds */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-200/50 dark:border-white/5 mb-8">
      <div>
        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
          Available Wallet Balance
        </span>
        <div className="text-3xl font-mono font-black text-slate-900 dark:text-white mb-1">
          ₹{balance.toLocaleString()}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Use your wallet balance to back campaigns or withdraw funds.
        </p>
      </div>

      <button
        onClick={onAddFunds}
        disabled={loading}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm cursor-pointer whitespace-nowrap"
      >
        <Plus className="w-4 h-4" />
        <span>{loading ? "Processing..." : "Add Funds"}</span>
      </button>
    </div>

    {/* Transactions */}
    <div className="yc-card overflow-hidden">
      <div className="px-6 py-4 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/10">
        Transaction History
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="animate-spin w-6 h-6 text-indigo-500" />
        </div>
      ) : !transactions?.length ? (
        <div className="flex flex-col items-center py-16 text-center">
          <span className="text-3xl mb-3">🪙</span>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
            No Transactions Yet
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
            Funds you add or campaigns you back will show up here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-150 dark:border-slate-800/60 bg-slate-50/20 dark:bg-slate-900/5">
                <th className="px-6 py-3.5 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Type
                </th>
                <th className="px-6 py-3.5 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Amount
                </th>
                <th className="px-6 py-3.5 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Description
                </th>
                <th className="px-6 py-3.5 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, idx) => {
                const isAdded = t.type === "ADD_FUNDS" || t.type === "WITHDRAWAL";
                const label =
                  t.type === "ADD_FUNDS"
                    ? "Deposit"
                    : t.type === "WITHDRAWAL"
                    ? "Withdrawal"
                    : "Payment";

                return (
                  <tr
                    key={idx}
                    className="border-b border-slate-100 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/5 transition-colors"
                  >
                    <td className="px-6 py-3 flex items-center gap-1.5 mt-0.5">
                      {isAdded ? (
                        <ArrowDownLeft className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <span
                        className={`text-xs font-bold ${
                          isAdded ? "text-emerald-500" : "text-rose-500"
                        }`}
                      >
                        {label}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-mono font-bold text-sm">
                      <span
                        className={
                          isAdded
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        }
                      >
                        {isAdded ? "+" : "-"}₹{t.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-xs text-slate-650 dark:text-slate-350">
                      {t.description ||
                        (t.type === "ADD_FUNDS"
                          ? "Wallet top-up"
                          : t.type === "WITHDRAWAL"
                          ? "Withdrawn from campaign"
                          : "Wallet debit")}
                    </td>
                    <td className="px-6 py-3 text-xs font-mono text-slate-400 dark:text-slate-500 whitespace-nowrap">
                      {formatDate(t.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);

export default Wallet;
