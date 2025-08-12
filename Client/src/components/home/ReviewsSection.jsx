import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { getInitials } from "../../utils/initials";

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
  {
    name: "Manan S.",
    university: "IIT Delhi",
    text: "Smoothest payout and campaign setup out there, but wish there were more campaign templates by default.",
    stars: 4,
  },
  {
    name: "Saloni B.",
    university: "Anna University",
    text: "Backer rewards are fun! The mobile view could be even better though.",
    stars: 4,
  },
  {
    name: "Harsh G.",
    university: "Amity University",
    text: "Crowdfunded my app project easily. Platform’s quick support really helped, but campaign editing can be improved.",
    stars: 4,
  },
  {
    name: "Ankita N.",
    university: "SRM University",
    text: "Great way for NGOs to reach college students. Would appreciate more visibility tools for creators.",
    stars: 3,
  },
  {
    name: "Rohan T.",
    university: "IISc Bangalore",
    text: "FuelFundr is where my robotics idea met supporters. Transparent progress bar is super motivating.",
    stars: 5,
  },
  {
    name: "Tanya D.",
    university: "Christ University",
    text: "Like how easy it is to track backing history. Wish campaign sorting had more options.",
    stars: 4,
  },
  {
    name: "Vipul S.",
    university: "Jadavpur University",
    text: "Setup and donation flows are simple. Would prefer faster campaign approval sometimes.",
    stars: 3,
  },
  {
    name: "Siddharth V.",
    university: "IIT Kanpur",
    text: "Peer-to-peer donations on FuelFundr feel really safe and empowering for students. Highly recommend.",
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

  function handleNext() {
    setIdx((i) => (i + 1) % reviews.length);
  }
  function handlePrev() {
    setIdx((i) => (i - 1 + reviews.length) % reviews.length);
  }

  // Calculate which reviews to display
  let shown = [];
  if (reviews.length <= visible) {
    shown = reviews;
  } else {
    for (let i = 0; i < visible; ++i) {
      shown.push(reviews[(idx + i) % reviews.length]);
    }
  }
  const isMobile = visible === 1;

  return (
    <section className="w-full bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-950 dark:to-blue-950 py-16 px-2 sm:px-3 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-600 to-green-300 bg-clip-text text-transparent">
        What Our Users Say
      </h2>
      <div className="flex items-center gap-2 sm:gap-6 max-w-5xl mx-auto w-full">
        {/* Prev arrow (always visible, disabled for one review) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous reviews"
          className="text-blue-500 hover:bg-blue-200/60 dark:hover:bg-slate-900/60 transition-all rounded-full p-2 disabled:opacity-40 disabled:pointer-events-none"
          disabled={reviews.length === 1}
        >
          <svg width="22" height="22" viewBox="0 0 20 20">
            <path
              d="M13 15l-5-5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {/* Review Cards */}
        <div
          className={`grid ${
            isMobile
              ? "grid-cols-1 gap-6"
              : visible === 2
              ? "grid-cols-2 gap-8"
              : "grid-cols-3 gap-6"
          } w-full`}
        >
          {shown.map((review, i) => (
            <div
              key={review.name + review.text.slice(0, 10) + i}
              className="relative glassy-card shadow-xl border border-blue-50 dark:border-slate-800 rounded-2xl p-7 pb-6 flex flex-col items-center bg-white/80 dark:bg-slate-900/80"
            >
              <div className="absolute top-3 left-3 opacity-30 text-green-400 dark:text-green-800">
                <Quote className="w-8 h-8" />
              </div>
              <div className="flex items-center mb-2 gap-3">
                <span className="rounded-full bg-gradient-to-br from-green-200 to-blue-200 dark:from-green-700 dark:to-blue-900 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 shadow border-2 border-blue-200 dark:border-green-700">
                  <span className="font-bold text-blue-900 dark:text-green-200 text-lg md:text-xl select-none">
                    {getInitials(review.name)}
                  </span>
                </span>
                <div>
                  <div className="font-bold text-blue-800 dark:text-green-300">
                    {review.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-green-100">
                    {review.university}
                  </div>
                </div>
              </div>
              <div className="text-[1.06rem] text-gray-700 dark:text-gray-100 mb-2 text-center">
                {review.text}
              </div>
              <div className="flex gap-1 justify-center mb-1">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-300"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Next arrow (always visible, disabled for one review) */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next reviews"
          className="text-blue-500 hover:bg-blue-200/60 dark:hover:bg-slate-900/60 transition-all rounded-full p-2 disabled:opacity-40 disabled:pointer-events-none"
          disabled={reviews.length === 1}
        >
          <svg width="22" height="22" viewBox="0 0 20 20">
            <path
              d="M7 5l5 5-5 5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <style>{`
        .glassy-card { backdrop-filter: blur(3px);}
      `}</style>
    </section>
  );
};

export default ReviewsSection;
