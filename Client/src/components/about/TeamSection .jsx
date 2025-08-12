import { getInitials } from "../../utils/initials";
import { Sparkles } from "lucide-react";

const founder = {
  name: "Shivansh Anand",
  role: "Founder & Lead Developer",
  bio: "Coding, designing, and hustling for the next generation of student makers. Loves hackathons & community-led growth 🚀",
  img: "/assets/Founder.png",
};

const founderQuote = `
  "I started FuelFundr to empower students and campus innovators everywhere—
  because I believe the world’s next big ideas can (and should) come from young creators like us. Every project you see here is part of that dream. Thanks for being a part of the journey!"
`;

const TeamSection = () => (
  <section className="w-full py-16 px-2 sm:px-4 bg-gradient-to-r from-green-100 to-blue-50 dark:from-green-900/40 dark:to-blue-900/10 flex flex-col items-center">
    <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent tracking-tight drop-shadow flex items-center justify-center gap-2">
      <Sparkles className="w-6 h-6 text-yellow-400" />
      Meet the Founder
    </h2>
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
      {/* Founder Card */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-[270px] max-w-md mx-auto bg-white/90 dark:bg-slate-900/75 border border-blue-100 dark:border-green-900 rounded-2xl glassy-card shadow-lg px-8 py-10 mb-8 md:mb-0">
        <div className="h-36 w-36 mb-6 flex items-center justify-center rounded-full border-4 border-blue-300 dark:border-green-200 shadow-lg bg-gradient-to-br from-blue-200 to-green-200 dark:from-green-900 dark:to-blue-900 overflow-hidden aspect-square">
          {founder.img ? (
            <img
              src={founder.img}
              alt={founder.name}
              className="h-full w-full object-cover object-top rounded-full aspect-square"
              loading="lazy"
            />
          ) : (
            <span className="text-4xl font-extrabold text-blue-700 dark:text-green-200">
              {getInitials(founder.name)}
            </span>
          )}
        </div>
        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent mb-1 text-center">
          {founder.name}
        </div>
        <div className="font-semibold text-green-700 dark:text-green-200 text-sm md:text-base mb-3 text-center">
          {founder.role}
        </div>
        <div className="text-gray-700 dark:text-green-100 text-center text-base md:text-lg mb-2">
          {founder.bio}
        </div>
      </div>
      {/* Quote/Visual Side */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl py-2 md:py-10">
        <blockquote className="w-full text-center italic text-blue-900 dark:text-green-200 text-lg md:text-xl font-medium leading-snug md:leading-normal px-2 md:px-0">
          {founderQuote}
        </blockquote>
      </div>
    </div>
    <style>{`
      .glassy-card { backdrop-filter: blur(7px);}
    `}</style>
  </section>
);

export default TeamSection;
