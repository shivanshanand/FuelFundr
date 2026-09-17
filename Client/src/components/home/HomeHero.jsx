import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Award, Zap } from "lucide-react";

const HomeHero = () => {
  // Spring transition config
  const springTransition = { type: "spring", stiffness: 100, damping: 15 };

  return (
    <header className="w-full pt-28 md:pt-40 pb-16 flex flex-col items-center relative overflow-hidden px-6 select-none">
      {/* Background radial accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Mini tag banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 text-xs font-mono mb-6 select-none"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Crowdfunding for Campus Innovators</span>
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.08] max-w-4xl text-center mb-6"
      >
        Launch. Support. <br />
        Celebrate<span className="text-indigo-500">.</span> Repeat<span className="text-indigo-500">.</span>
      </motion.h1>

      {/* Subdescription */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-2xl text-center text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-8"
      >
        FuelFundr is the future of student crowdfunding. Launch campaigns in seconds, collect contributions securely, earn milestones, and track everything in real-time.
      </motion.p>

      {/* CTA Button Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto z-10 mb-16"
      >
        <Link
          to="/register"
          className="w-full sm:w-auto px-8 py-3.5 min-w-[12rem] rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 flex justify-center items-center shadow-lg shadow-indigo-600/10 cursor-pointer"
        >
          Get Started
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Link>
        <Link
          to="/campaigns"
          className="w-full sm:w-auto px-8 py-3.5 min-w-[12rem] rounded-xl text-sm font-bold border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition flex justify-center items-center shadow-sm cursor-pointer"
        >
          View Campaigns
        </Link>
      </motion.div>

      {/* CSS 3D Interactive Floating Mockup Stack */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="relative w-full max-w-4xl h-[260px] xs:h-[340px] flex items-center justify-center pointer-events-none mt-2 select-none"
        style={{ perspective: "1000px" }}
      >
        {/* Mockup Card 1: Main Campaign detail */}
        <div
          className="absolute w-[240px] xs:w-[280px] p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl animate-float translate-x-[-110px] xs:translate-x-[-150px] translate-y-[-10px] z-20"
          style={{ transform: "rotateY(16deg) rotateX(8deg) rotateZ(-3deg)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-slate-400">ACTIVE CAMPAIGN</span>
          </div>
          <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-2 truncate">Autonomous Rover Core</h4>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
            <div className="w-3/4 h-full bg-indigo-500 rounded-full" />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>75% Raised</span>
            <span className="text-emerald-500 font-bold">₹15,000</span>
          </div>
        </div>

        {/* Mockup Card 2: Badges Display */}
        <div
          className="absolute w-[200px] xs:w-[230px] p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-500/20 shadow-2xl animate-float-delayed translate-x-[90px] xs:translate-x-[120px] translate-y-[30px] z-10"
          style={{ transform: "rotateY(-18deg) rotateX(10deg) rotateZ(4deg)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-indigo-500" />
            <span className="text-[10px] font-mono font-bold text-slate-400">UNLOCKED BADGE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-sm font-bold text-indigo-500">🏆</span>
            <div>
              <h4 className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight">Fundraiser</h4>
              <p className="text-[9px] text-slate-400 leading-none">Launched 3+ campaigns</p>
            </div>
          </div>
        </div>

        {/* Mockup Card 3: Tiny Alert/Status Card */}
        <div
          className="absolute w-[180px] p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl animate-float translate-x-[10px] translate-y-[-70px] z-30"
          style={{ transform: "rotateY(0deg) rotateX(6deg) rotateZ(-1deg)" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-800 dark:text-white block leading-none">Contribution Safe</span>
              <span className="text-[8px] font-mono text-slate-400">Razorpay Encrypted</span>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default HomeHero;
