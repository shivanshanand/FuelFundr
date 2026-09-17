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
];

const TestimonialsSection = () => (
  <section className="w-full py-16 px-6 bg-slate-50 dark:bg-slate-950/45 flex flex-col items-center select-none">
    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-10 text-center">
      What Our Community Says
    </h2>
    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((t) => (
        <div
          key={t.name + t.role}
          className="yc-card p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex flex-col items-center text-center shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-black text-slate-700 dark:text-slate-200">
                {getInitials(t.name)}
              </span>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                {t.name}
              </h4>
              <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mt-0.5">
                {t.role}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
            “{t.text}”
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
