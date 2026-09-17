import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I start a campaign on FuelFundr?",
    answer:
      "On the homepage, click 'View Campaigns' in the hero section, then select 'Create Campaign.' Share your story, set your goal, and your campaign will be live within seconds!",
  },
  {
    question: "Does FuelFundr charge platform fees?",
    answer:
      "Nope! Every rupee you raise goes directly to your cause (we charge 0% platform commission).",
  },
  {
    question: "How fast will I get paid once a campaign is funded?",
    answer:
      "Withdrawals are possible anytime and hit your wallet in as little as 2 minutes — we offer almost-instant payouts.",
  },
  {
    question: "Where can I view all campaigns?",
    answer: "Just click 'View Campaigns' in the hero section of the homepage!",
  },
  {
    question: "What makes FuelFundr different from other platforms?",
    answer:
      "Badges, analytics, student-first support, and a personal dashboard for every user—including donors! Plus, zero platform fees.",
  },
  {
    question: "Is it safe to donate on FuelFundr?",
    answer:
      "Yes! All payments are processed securely with Razorpay and bank-grade encryption.",
  },
  {
    question: "Can I track my donations and campaign performance?",
    answer:
      "Absolutely! See every rupee donated, badges earned, and milestones right in your dashboard.",
  },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-20 flex flex-col items-center select-none">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-black text-center text-slate-900 dark:text-white mb-14 tracking-tighter"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="w-full flex flex-col gap-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="rounded-2xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-[#0e121a]/50 shadow-sm overflow-hidden"
          >
            <button
              className="flex items-center justify-between w-full px-5 py-5 text-left focus:outline-none cursor-pointer"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              aria-expanded={openIdx === idx}
            >
              <span className="flex items-center gap-3 font-bold text-slate-800 dark:text-slate-200 text-base sm:text-lg">
                <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                {faq.question}
              </span>
              <ChevronDown
                className={
                  "w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 " +
                  (openIdx === idx ? "rotate-180 text-indigo-500" : "")
                }
              />
            </button>

            <AnimatePresence initial={false}>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-1 text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-slate-800/50">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
