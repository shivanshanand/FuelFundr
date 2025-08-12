import React from "react";

// Helper for initials
function getInitials(name) {
  if (!name) return "";
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0][0].toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
}

const testimonials = [
  {
    name: "Priya S.",
    role: "Student Campaigner",
    text: "The FuelFundr team helped me go from idea to launch in a week. The dashboard and badges kept me motivated. Highly recommended!",
  },
  {
    name: "Manish Gupta",
    role: "Alumni Backer",
    text: "Proud to support future leaders! 0% fees and instant payouts—this is how campus crowdfunding should work.",
  },
  {
    name: "Arya P.",
    role: "Hackathon Organizer",
    text: "Loved the analytics and badge system! FuelFundr made our event's fundraising easy, transparent, and even fun.",
  },
  // Add more quotes if you like!
];

const TestimonialsSection = () => (
  <section className="w-full py-16 px-4 bg-gradient-to-r from-blue-50 to-green-100 dark:from-slate-800/50 dark:to-green-900/30 flex flex-col items-center">
    <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent tracking-tight drop-shadow">
      What Our Community Says
    </h2>
    <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((t) => (
        <div
          key={t.name + t.role}
          className="rounded-2xl glassy-card shadow-lg border border-blue-200 dark:border-green-800 bg-white/80 dark:bg-slate-900/70 flex flex-col items-center p-7"
        >
          <div className="flex items-center mb-3 gap-2">
            <span className="rounded-full bg-gradient-to-br from-green-300 to-blue-200 dark:from-green-900 dark:to-blue-900 flex items-center justify-center w-12 h-12 font-bold text-blue-800 dark:text-green-200 text-xl border-2 border-green-200 dark:border-blue-800 shadow">
              {getInitials(t.name)}
            </span>
            <div>
              <div className="font-bold text-blue-900 dark:text-green-200">
                {t.name}
              </div>
              <div className="text-xs font-semibold text-green-700 dark:text-green-200">
                {t.role}
              </div>
            </div>
          </div>
          <div className="text-gray-700 dark:text-green-100 text-center text-[1.09rem] mb-2">
            “{t.text}”
          </div>
        </div>
      ))}
    </div>
    <style>{`
      .glassy-card { backdrop-filter: blur(6px);}
    `}</style>
  </section>
);

export default TestimonialsSection;
