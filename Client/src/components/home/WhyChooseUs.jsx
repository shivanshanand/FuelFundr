import { ShieldCheck, Zap, Award, Smile, PieChart, Activity } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: <Zap className="w-8 h-8 text-indigo-500 animate-icon-bounce" />,
    title: "0% Platform Fees",
    desc: "Every rupee you raise goes straight to your cause. We charge zero commission.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-indigo-500 animate-icon-pulse" />,
    title: "Secure Transactions",
    desc: "Razorpay and bank-grade encryption—every contribution is super safe.",
  },
  {
    icon: <Award className="w-8 h-8 text-indigo-500 animate-wiggle-slow" />,
    title: "Earn Badges",
    desc: "Get recognized for funding, launching, or helping others succeed.",
  },
  {
    icon: <PieChart className="w-8 h-8 text-indigo-500 animate-flip" />,
    title: "Visual Dashboard",
    desc: "See your impact, badges, wallet, and campaign analytics at a glance.",
  },
  {
    icon: <Activity className="w-8 h-8 text-indigo-500 animate-pulse" />,
    title: "Track Your Impact",
    desc: "Every rupee raised, badge earned, and milestone tracked instantly.",
  },
  {
    icon: <Smile className="w-8 h-8 text-indigo-500 animate-spin-slow" />,
    title: "Student-First",
    desc: "Simple, friendly, and made for first-time fundraisers and backers.",
  },
];

const WhyChooseUs = () => {
  // Stagger container config
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <section className="w-full py-20 px-6 flex flex-col items-center bg-white dark:bg-[#07090e] transition-colors duration-200 select-none">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-black text-center text-slate-900 dark:text-white mb-16 tracking-tighter"
      >
        Why Choose Us?
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {reasons.map((reason) => (
          <motion.div
            key={reason.title}
            variants={cardVariants}
            className="yc-card yc-card-hover flex flex-col items-center text-center p-8 min-h-[220px]"
          >
            <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/5 border border-indigo-500/10">
              {reason.icon}
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">
              {reason.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {reason.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
