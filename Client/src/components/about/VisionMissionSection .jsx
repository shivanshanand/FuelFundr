import { Flag, Eye } from "lucide-react";

const VisionMissionSection = () => (
  <section className="w-full py-16 px-6 bg-slate-50 dark:bg-slate-950/20 flex flex-col items-center select-none">
    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch justify-center">
      {/* Mission */}
      <div className="yc-card p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex flex-col items-center text-center shadow-sm">
        <div className="w-10 h-10 rounded-full bg-indigo-555/5 dark:bg-indigo-500/5 flex items-center justify-center border border-indigo-500/10 mb-4">
          <Flag className="w-5 h-5 text-indigo-500" />
        </div>
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 tracking-tight">
          Our Mission
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
          FuelFundr exists to break barriers for student creators: making fundraising fast, fair, and rewarding—without any transaction fees or onboarding friction.
        </p>
      </div>

      {/* Vision */}
      <div className="yc-card p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex flex-col items-center text-center shadow-sm">
        <div className="w-10 h-10 rounded-full bg-indigo-555/5 dark:bg-indigo-500/5 flex items-center justify-center border border-indigo-500/10 mb-4">
          <Eye className="w-5 h-5 text-indigo-500" />
        </div>
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 tracking-tight">
          Our Vision
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
          Every student, everywhere—fully empowered to turn their ideas into action, and grow alongside the support of an inspiring, global community.
        </p>
      </div>
    </div>
  </section>
);

export default VisionMissionSection;
