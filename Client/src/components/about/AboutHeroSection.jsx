import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutHeroSection = () => {
  const navigate = useNavigate();
    
  return (
    <section className="w-full bg-slate-50 dark:bg-slate-950/20 py-16 px-6 text-center flex flex-col items-center justify-center relative select-none">
      {/* Back button */}
      <button
        onClick={() =>
          window.history.length > 1 ? navigate(-1) : navigate("/")
        }
        className="absolute top-6 left-6 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-indigo-500 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer shadow-sm transition-all duration-200"
        title="Go Back"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </button>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
        About Us
      </h1>
      
      {/* Tagline */}
      <p className="max-w-md mx-auto text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-widest leading-relaxed mb-6">
        Funding student dreams. Empowering campus change-makers, one campaign at a time.
      </p>

      {/* Down arrow cue */}
      <div className="mt-4 flex flex-col items-center animate-bounce-custom">
        <span className="text-sm font-bold text-slate-400">↓</span>
      </div>
    </section>
  );
};

export default AboutHeroSection;
