import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { getInitials } from "../../utils/initials";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    name: "Priya S.",
    university: "IIT Bombay",
    text: "FuelFundr made launching my project so easy—had my first donation in minutes and the dashboard is super clear!",
    stars: 5,
  },
  {
    name: "Rahul M.",
    university: "BITS Goa",
    text: "No platform fees and instant payouts?! Never seen a student crowdfunding platform this smooth before.",
    stars: 5,
  },
  {
    name: "Shubham Gupta",
    university: "MIT Jaipur",
    text: "Love the badges and analytics—makes giving fun! Can track all my contributions easily.",
    stars: 4,
  },
  {
    name: "Jatin P.",
    university: "NIT Jalandhar",
    text: "We went from zero to fully-funded in just 9 days on FuelFundr. The team is super responsive and I recommend to all creators.",
    stars: 5,
  },
  {
    name: "Sneha T.",
    university: "NIT Trichy",
    text: "Our hackathon project gained real traction thanks to the fast campaign launch. Great for student innovators!",
    stars: 5,
  },
  {
    name: "Aman J.",
    university: "Delhi University",
    text: "Simple UI and instant payout is a game changer. Would like even more customization for campaign pages.",
    stars: 4,
  },
  {
    name: "Nidhi K.",
    university: "VIT Vellore",
    text: "I donated to 3 projects in one evening! Love the student focus and leaderboard badge concept.",
    stars: 5,
  },
];

function useVisibleCount() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) setCount(1);
      else if (window.innerWidth < 1024) setCount(2);
      else setCount(3);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return count;
}

const ReviewsSection = () => {
  const visible = useVisibleCount();
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  function handleNext() {
    setDirection(1);
    setIdx((i) => (i + 1) % reviews.length);
  }
  
  function handlePrev() {
    setDirection(-1);
    setIdx((i) => (i - 1 + reviews.length) % reviews.length);
  }

  let shown = [];
  for (let i = 0; i < visible; ++i) {
    shown.push(reviews[(idx + i) % reviews.length]);
  }
  const isMobile = visible === 1;

  return (
    <section className="w-full bg-slate-50/50 dark:bg-slate-950/20 border-y border-slate-200/50 dark:border-white/5 py-20 px-6 flex flex-col items-center select-none">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-black text-center text-slate-900 dark:text-white mb-16 tracking-tighter"
      >
        What Our Users Say
      </motion.h2>

      <div className="flex items-center gap-4 max-w-5xl mx-auto w-full relative">
        {/* Prev Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous reviews"
          className="p-2 border border-slate-200 dark:border-white/10 rounded-full hover:border-indigo-500 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-500 shadow-sm transition cursor-pointer shrink-0 z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Cards Row */}
        <div className="flex-grow w-full overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={idx + "-" + visible}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={`grid ${
                isMobile
                  ? "grid-cols-1 gap-6"
                  : visible === 2
                  ? "grid-cols-2 gap-6"
                  : "grid-cols-3 gap-6"
              } w-full`}
            >
              {shown.map((review, i) => (
                <div
                  key={review.name + "-" + i}
                  className="yc-card p-8 flex flex-col justify-between min-h-[220px] relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 opacity-15 text-indigo-500">
                    <Quote className="w-8 h-8 rotate-180" />
                  </div>

                  <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 italic z-10">
                    "{review.text}"
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center font-bold text-indigo-600 text-xs">
                        {getInitials(review.name)}
                      </span>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200 text-xs leading-tight">
                          {review.name}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                          {review.university}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-0.5">
                      {Array.from({ length: review.stars }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-3.5 h-3.5 text-amber-500 fill-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next reviews"
          className="p-2 border border-slate-200 dark:border-white/10 rounded-full hover:border-indigo-500 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-500 shadow-sm transition cursor-pointer shrink-0 z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default ReviewsSection;
