import { Link } from "react-router-dom";

const HomeHero = () => (
  <header className="w-full pt-24 md:pt-32 pb-10 md:pb-16 text-center z-10">
    <h1
      className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-6
      bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent drop-shadow
      leading-tight"
    >
      Launch. Support. Celebrate. Repeat.
    </h1>
    <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-2xl text-gray-700 dark:text-gray-200 mb-8">
      FuelFundr is the future of campus crowdfunding: Fast launches, social
      sharing, badges, and real-time tracking—all built for the student
      community.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
      <Link
        to="/register"
        className="w-full sm:w-auto px-8 py-4 min-w-[12rem] rounded-xl text-lg font-bold 
          bg-gradient-to-r from-green-400 to-blue-600 text-white shadow
          hover:from-green-500 hover:to-blue-700 flex justify-center items-center transition"
      >
        Get Started
      </Link>
      <Link
        to="/campaigns"
        className="w-full sm:w-auto px-8 py-4 min-w-[12rem] rounded-xl text-lg font-bold border-2
          border-blue-600 dark:border-green-400 text-blue-700 dark:text-green-300
          bg-white/60 dark:bg-slate-900/80 shadow hover:bg-blue-100 dark:hover:bg-green-950
          flex justify-center items-center transition"
      >
        View Campaigns
      </Link>
    </div>
  </header>
);

export default HomeHero;
