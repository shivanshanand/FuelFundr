import React from "react";
import { Flag, Eye } from "lucide-react";

const VisionMissionSection = () => (
  <section className="w-full py-16 px-4 bg-gradient-to-r from-blue-900/60 to-green-900/70 dark:from-slate-900 dark:to-blue-900/90 flex flex-col items-center">
    <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-stretch justify-center">
      {/* Mission */}
      <div className="flex-1 glassy-card rounded-2xl p-8 flex flex-col items-center shadow-lg border border-blue-200 dark:border-green-800 bg-white/70 dark:bg-slate-900/50">
        <Flag className="w-9 h-9 text-green-400 mb-4 animate-bounce" />
        <h3 className="text-2xl font-bold mb-2 text-green-700 dark:text-green-200 text-center">
          Our Mission
        </h3>
        <p className="text-md md:text-lg text-blue-900 dark:text-green-100 text-center opacity-80">
          FuelFundr exists to break barriers for student creators: making
          fundraising fast, fair, rewarding—without fees or friction.
        </p>
      </div>
      {/* Vision */}
      <div className="flex-1 glassy-card rounded-2xl p-8 flex flex-col items-center shadow-lg border border-green-200 dark:border-blue-800 bg-white/70 dark:bg-slate-900/50">
        <Eye className="w-9 h-9 text-blue-400 mb-4 animate-pulse" />
        <h3 className="text-2xl font-bold mb-2 text-blue-700 dark:text-green-100 text-center">
          Our Vision
        </h3>
        <p className="text-md md:text-lg text-blue-900 dark:text-green-100 text-center opacity-80">
          Every student, everywhere—empowered to turn ideas into action, and
          grow with the support of an inspiring community.
        </p>
      </div>
    </div>
    <style>{`
      .glassy-card { backdrop-filter: blur(5px); }
    `}</style>
  </section>
);

export default VisionMissionSection;
