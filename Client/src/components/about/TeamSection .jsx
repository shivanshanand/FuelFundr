import { getInitials } from "../../utils/initials";
import { Sparkles } from "lucide-react";
import FounderImg from "../../../assets/Founder.png";

const founder = {
  name: "Shivansh Anand",
  role: "Founder & Lead Developer",
  bio: "Coding, designing, and building for the next generation of student makers. Focused on campus hackathons & community-led growth.",
  img: FounderImg,
};

const founderQuote = `
  "I started FuelFundr to empower students and campus innovators everywhere—
  because I believe the world’s next big ideas can and should come from young creators like us. Every project you see here is part of that dream. Thanks for being a part of the journey!"
`;

const TeamSection = () => (
  <section className="w-full py-16 px-6 bg-slate-50 dark:bg-slate-950/40 flex flex-col items-center select-none">
    <div className="flex items-center justify-center gap-2 mb-10">
      <Sparkles className="w-5 h-5 text-indigo-500" />
      <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
        Meet the Founder
      </h2>
    </div>
    
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
      {/* Founder Card */}
      <div className="yc-card p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex flex-col items-center text-center shadow-sm max-w-xs w-full">
        <div className="h-28 w-28 mb-6 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm aspect-square bg-slate-100 dark:bg-slate-950">
          {founder.img ? (
            <img
              src={founder.img}
              alt={founder.name}
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <span className="text-2xl font-black text-slate-700 dark:text-slate-200">
              {getInitials(founder.name)}
            </span>
          )}
        </div>
        
        <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1">
          {founder.name}
        </h4>
        
        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-3">
          {founder.role}
        </span>
        
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {founder.bio}
        </p>
      </div>
      
      {/* Quote Side */}
      <div className="flex-1 max-w-md flex flex-col items-center justify-center py-4">
        <blockquote className="text-sm md:text-base italic font-medium text-slate-600 dark:text-slate-350 leading-relaxed text-center">
          {founderQuote}
        </blockquote>
      </div>
    </div>
  </section>
);

export default TeamSection;
