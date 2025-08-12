import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

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
    <section className="w-full max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-3 py-12 sm:py-16 flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-8 sm:mb-10 text-center bg-gradient-to-r from-green-600 to-blue-400 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>
      <div className="w-full flex flex-col gap-3 sm:gap-4">
        {faqs.map((faq, idx) => (
          <div
            key={faq.question}
            className="rounded-2xl border border-blue-100 dark:border-green-800 bg-white/90 dark:bg-slate-900/80 shadow-md transition"
          >
            <button
              className="flex items-center justify-between w-full px-4 sm:px-5 py-4 sm:py-5 focus:outline-none"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              aria-expanded={openIdx === idx}
            >
              <span className="flex items-center gap-2 font-bold text-blue-700 dark:text-green-300 text-base sm:text-lg text-left">
                <HelpCircle className="w-6 h-6 text-green-400 shrink-0" />
                {faq.question}
              </span>
              <ChevronDown
                className={
                  "w-6 h-6 ml-2 transition-transform duration-300 " +
                  (openIdx === idx
                    ? "rotate-180 text-green-400"
                    : "text-blue-400")
                }
              />
            </button>
            <div
              className={
                "px-6 sm:px-8 pb-4 sm:pb-[1.15rem] text-base text-gray-600 dark:text-green-100 transition-all duration-300 overflow-hidden " +
                (openIdx === idx
                  ? "max-h-[400px] opacity-100"
                  : "max-h-0 opacity-70 pointer-events-none")
              }
              style={{ transition: "all 0.4s cubic-bezier(.4,2,.6,1)" }}
              aria-hidden={openIdx !== idx}
            >
              {openIdx === idx && <div>{faq.answer}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
