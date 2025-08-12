import CountUp from "react-countup";

// Pass stats as props!
const StatsBar = ({ stats }) => (
  <section className="w-full px-2 sm:px-0 py-6 bg-gradient-to-r from-blue-100 to-green-100 dark:from-slate-900 dark:to-green-950">
    <div className="flex flex-col sm:flex-row max-w-6xl mx-auto divide-y sm:divide-y-0 sm:divide-x divide-blue-300 dark:divide-green-900">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`
            flex-1 flex flex-col justify-center items-center py-5 sm:py-7 px-2
            min-w-0
          `}
        >
          <div className="font-bold text-2xl sm:text-3xl md:text-4xl text-blue-700 dark:text-green-300 flex items-center gap-1">
            {stat.prefix || ""}
            <span className="count-up">
              <CountUp
                end={stat.value}
                duration={1.3}
                separator=","
                decimals={stat.value < 1 ? 3 : 0}
                formattingFn={(n) => {
                  if (n >= 1e7) return (n / 1e7).toFixed(1) + "Cr";
                  if (n >= 1e5) return (n / 1e5).toFixed(1) + "L";
                  return n.toLocaleString();
                }}
              />
            </span>
            {stat.suffix || ""}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-green-100 font-bold uppercase tracking-wide mt-2 text-center whitespace-pre-line">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
    <style>{`
      .count-up { transition: color 0.5s; }
    `}</style>
  </section>
);

export default StatsBar;
