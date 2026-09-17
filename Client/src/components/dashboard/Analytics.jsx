import { useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Award, Users, TrendingUp, Wallet } from "lucide-react";

const formatShortDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", { month: "short", day: "numeric" });

const COLORS = ["#10b981", "#6366f1", "#f59e0b", "#ec4899", "#ef4444"];

const Analytics = ({ user, campaigns, transactions }) => {
  const walletData = useMemo(() => {
    if (!transactions?.length) return [];
    let running = 0;
    return [...transactions].reverse().map((t) => {
      if (t.type === "ADD_FUNDS" || t.type === "WITHDRAWAL") running += t.amount;
      if (t.type === "DONATION") running -= t.amount;
      return {
        date: formatShortDate(t.createdAt),
        balance: running,
        type: t.type,
      };
    });
  }, [transactions]);

  const byMonth = {};
  transactions?.forEach((t) => {
    const month = new Date(t.createdAt).toLocaleString("en-IN", { month: "short", year: "2-digit" });
    if (!byMonth[month]) byMonth[month] = { month, Donations: 0, Withdrawals: 0, Adds: 0 };
    if (t.type === "DONATION") byMonth[month].Donations += t.amount;
    if (t.type === "WITHDRAWAL") byMonth[month].Withdrawals += t.amount;
    if (t.type === "ADD_FUNDS") byMonth[month].Adds += t.amount;
  });
  const barData = Object.values(byMonth);

  const cByMonth = {};
  campaigns?.forEach((c) => {
    const month = new Date(c.createdAt).toLocaleString("en-IN", { month: "short", year: "2-digit" });
    if (!cByMonth[month]) cByMonth[month] = 0;
    cByMonth[month]++;
  });
  const campaignBarData = Object.entries(cByMonth).map(([month, count]) => ({
    month, Campaigns: count,
  }));

  const pieData = [
    { name: "Deposits", value: transactions.filter(t => t.type==="ADD_FUNDS").reduce((a,b)=>a+b.amount,0) },
    { name: "Donations", value: transactions.filter(t => t.type==="DONATION").reduce((a,b)=>a+b.amount,0) },
    { name: "Withdrawals", value: transactions.filter(t => t.type==="WITHDRAWAL").reduce((a,b)=>a+b.amount,0) },
  ];

  const kpi = [
    {
      icon: <Award className="w-5 h-5 text-indigo-500" />,
      label: "Badges Earned",
      value: user?.badges?.length || 0,
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-500" />,
      label: "My Campaigns",
      value: campaigns?.length || 0,
    },
    {
      icon: <Wallet className="w-5 h-5 text-indigo-500" />,
      label: "Total Deposited",
      value: "₹" + transactions.filter(t=>t.type==="ADD_FUNDS").reduce((a,b)=>a+b.amount,0).toLocaleString(),
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
      label: "Total Donated",
      value: "₹" + transactions.filter(t=>t.type==="DONATION").reduce((a,b)=>a+b.amount,0).toLocaleString(),
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpi.map((k) => (
          <div
            key={k.label}
            className="yc-card bg-slate-50/50 dark:bg-slate-950/20 p-5 border border-slate-200/50 dark:border-white/5 flex items-center gap-3.5"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-500/5 flex items-center justify-center border border-indigo-500/10 shrink-0">
              {k.icon}
            </div>
            <div>
              <div className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">
                {k.label}
              </div>
              <div className="text-sm font-mono font-black text-slate-800 dark:text-white leading-none">
                {k.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wallet Balance Trend */}
        <div className="yc-card p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 shadow-sm">
          <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-555 uppercase tracking-widest mb-4">Wallet Balance Trend</h4>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={walletData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              <Line type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Campaigns Created */}
        <div className="yc-card p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 shadow-sm">
          <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-555 uppercase tracking-widest mb-4">Campaigns Launched</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={campaignBarData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              <Bar dataKey="Campaigns" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions Stack Bar */}
        <div className="yc-card p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 shadow-sm">
          <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-555 uppercase tracking-widest mb-4">Volume Statistics</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              <Bar dataKey="Adds" stackId="a" fill="#10b981" />
              <Bar dataKey="Withdrawals" stackId="a" fill="#f59e0b" />
              <Bar dataKey="Donations" stackId="a" fill="#6366f1" />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Wallet Distribution Pie */}
        <div className="yc-card p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 shadow-sm flex flex-col items-center">
          <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-555 uppercase tracking-widest mb-4 self-start">Wallet Distribution</h4>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={65}
                label={{ fontSize: 9 }}
              >
                {pieData.map((d, i) => (
                  <Cell key={d.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
