import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutHeroSection = () => {
    const navigate = useNavigate();
    
  return (
    <section className="w-full bg-gradient-to-br from-blue-800 via-blue-900 to-green-900 dark:from-slate-900 dark:via-blue-950 dark:to-green-950 py-16 px-4 text-white flex flex-col items-center justify-center relative">
      <button
        onClick={() =>
          window.history.length > 1 ? navigate(-1) : navigate("/")
        }
        className="absolute top-6 left-4 sm:top-8 sm:left-8 flex items-center gap-2 px-4 py-2
          rounded-xl bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold 
          shadow-lg hover:from-blue-800 hover:to-green-700 transition text-base
          border border-blue-300 dark:border-green-700
          backdrop-blur-md
        "
        title="Go Back"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Back</span>
      </button>
      {/* Main Headline */}
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-6 bg-gradient-to-r from-green-300 via-blue-200 to-green-500 bg-clip-text text-transparent drop-shadow-lg">
        About <span className="text-white bg-none">Us</span>
      </h1>
      {/* Tagline */}
      <p className="max-w-2xl mx-auto text-lg md:text-2xl text-center font-semibold opacity-95 mb-8">
        Funding student dreams. Empowering change, one campaign at a time.
      </p>
      {/* Optional: Brand Illustration */}
      {/* <img src={AboutIllustration} className="mt-3 w-60 md:w-96 mx-auto" alt="About FuelFundr" /> */}
      {/* Scroll cue */}
      <div className="mt-4 flex flex-col items-center animate-bounce">
        <span className="text-2xl text-green-300">↓</span>
      </div>
    </section>
  );
};

export default AboutHeroSection;
