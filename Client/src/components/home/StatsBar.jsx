import CountUp from "react-countup";
import { motion } from "framer-motion";

const StatsBar = ({ stats }) => (
  <section className="w-full py-10 bg-slate-50/50 dark:bg-slate-950/25 border-y border-slate-200/50 dark:border-white/5 transition-colors duration-200">
    <div className="grid grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto gap-y-6 md:gap-y-0 md:divide-x divide-slate-200 dark:divide-white/5">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="flex flex-col justify-center items-center px-4"
        >
          <div className="font-mono text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white font-black tracking-tight flex items-center select-none">
            {stat.prefix || ""}
            <span>
              <CountUp
                end={stat.value}
                duration={1.5}
                separator=","
                formattingFn={(n) => {
                  if (n >= 1e7) return (n / 1e7).toFixed(1) + "Cr";
                  if (n >= 1e5) return (n / 1e5).toFixed(1) + "L";
                  return n.toLocaleString();
                }}
              />
            </span>
            {stat.suffix || ""}
          </div>
          <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-mono font-bold uppercase tracking-widest mt-2 text-center">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default StatsBar;
