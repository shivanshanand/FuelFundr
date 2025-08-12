import React, { useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Award, Users, TrendingUp, Wallet } from "lucide-react";

// Helper to format date for charts
const formatShortDate = (date) =>
  new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const COLORS = ["#34d399", "#6366f1", "#f59e42", "#16a34a", "#f87171"];

const Analytics = ({ user, campaigns, transactions }) => {
  // 1. Wallet Trend (balance over time)
  // Make fake balance trend from add funds and withdrawal...
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

  // 2. Donations vs Withdrawals by month
  const byMonth = {};
  transactions?.forEach((t) => {
    const month = new Date(t.createdAt).toLocaleString("en-US", { month: "short", year: "2-digit" });
    if (!byMonth[month]) byMonth[month] = { month, Donations: 0, Withdrawals: 0, Adds: 0 };
    if (t.type === "DONATION") byMonth[month].Donations += t.amount;
    if (t.type === "WITHDRAWAL") byMonth[month].Withdrawals += t.amount;
    if (t.type === "ADD_FUNDS") byMonth[month].Adds += t.amount;
  });
  const barData = Object.values(byMonth);

  // 3. Campaigns by month
  const cByMonth = {};
  campaigns?.forEach((c) => {
    const month = new Date(c.createdAt).toLocaleString("en-US", { month: "short", year: "2-digit" });
    if (!cByMonth[month]) cByMonth[month] = 0;
    cByMonth[month]++;
  });
  const campaignBarData = Object.entries(cByMonth).map(([month, count]) => ({
    month, Campaigns: count,
  }));

  // 4. Contribution Pie
  const pieData = [
    { name: "Wallet Top-ups", value: transactions.filter(t => t.type==="ADD_FUNDS").reduce((a,b)=>a+b.amount,0) },
    { name: "Donations", value: transactions.filter(t => t.type==="DONATION").reduce((a,b)=>a+b.amount,0) },
    { name: "Withdrawals", value: transactions.filter(t => t.type==="WITHDRAWAL").reduce((a,b)=>a+b.amount,0) },
  ];

  // 5. KPI cards
  const kpi = [
    {
      icon: <Award className="w-7 h-7 text-yellow-400" />,
      label: "Badges",
      value: user?.badges?.length || 0,
    },
    {
      icon: <Users className="w-7 h-7 text-blue-500" />,
      label: "Campaigns",
      value: campaigns?.length || 0,
    },
    {
      icon: <Wallet className="w-7 h-7 text-green-400" />,
      label: "Total Added",
      value: "₹" + transactions.filter(t=>t.type==="ADD_FUNDS").reduce((a,b)=>a+b.amount,0),
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-pink-400" />,
      label: "Total Donated",
      value: "₹" + transactions.filter(t=>t.type==="DONATION").reduce((a,b)=>a+b.amount,0),
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-9 text-center bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent tracking-tight">
        Analytics
      </h2>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {kpi.map((k) => (
          <div
            key={k.label}
            className="flex items-center gap-4 p-6 rounded-xl bg-white/90 dark:bg-slate-900/90 shadow border border-blue-100 dark:border-slate-800"
          >
            <div className="">{k.icon}</div>
            <div>
              <div className="font-bold text-blue-700 dark:text-green-300 uppercase text-xs tracking-wider">
                {k.label}
              </div>
              <div className="text-lg md:text-2xl font-extrabold text-gray-700 dark:text-green-100">
                {k.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Wallet Trend */}
        <div className="p-6 rounded-2xl shadow bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800">
          <div className="font-bold text-blue-700 dark:text-green-300 mb-3">Wallet Balance Trend</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={walletData}>
              <CartesianGrid strokeDasharray="6 6" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#22c55e" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Campaigns Launched */}
        <div className="p-6 rounded-2xl shadow bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800">
          <div className="font-bold text-blue-700 dark:text-green-300 mb-3">Campaigns by Month</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={campaignBarData}>
              <CartesianGrid strokeDasharray="6 6" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="Campaigns" fill="#6366f1" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Transactions Bar */}
        <div className="p-6 rounded-2xl shadow bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800">
          <div className="font-bold text-blue-700 dark:text-green-300 mb-3">Adds/Withdrawals/Donations</div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="6 6" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Adds" stackId="a" fill="#34d399" />
              <Bar dataKey="Withdrawals" stackId="a" fill="#f59e42" />
              <Bar dataKey="Donations" stackId="a" fill="#6366f1" />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Contribution Split */}
        <div className="p-6 rounded-2xl shadow bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 flex flex-col items-center justify-center">
          <div className="font-bold text-blue-700 dark:text-green-300 mb-3">Your Wallet Activity</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={85}
                label
              >
                {pieData.map((d, i) => (
                  <Cell key={d.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
