import { UserPlus, Rocket, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <UserPlus className="w-8 h-8 text-indigo-500" />,
    title: "Register Account",
    desc: "Sign up in seconds using your email or Google OAuth.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-indigo-500" />,
    title: "Launch Campaign",
    desc: "Write your description, upload an image, and set your funding target.",
  },
  {
    icon: <Wallet className="w-8 h-8 text-indigo-500" />,
    title: "Receive Contributions",
    desc: "Receive donations directly, unlock achievements, and withdraw funds.",
  },
];

const StepsSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="w-full py-20 px-6 flex flex-col items-center bg-slate-50/50 dark:bg-slate-950/10 border-y border-slate-200/50 dark:border-white/5 transition-colors duration-200 select-none">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-black text-center text-slate-900 dark:text-white mb-16 tracking-tighter"
      >
        How It Works
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 gap-x-8 items-stretch"
      >
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            variants={itemVariants}
            className="flex flex-col items-center text-center relative"
          >
            {/* Circle timeline indicator */}
            <div className="w-20 h-20 rounded-full bg-indigo-500/5 border border-indigo-500/15 flex items-center justify-center mb-6 relative">
              {step.icon}
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-mono font-bold text-xs flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow">
                {idx + 1}
              </span>
            </div>

            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">
              {step.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              {step.desc}
            </p>

            {/* Horizontal timeline link indicator for Desktop */}
            {idx < steps.length - 1 && (
              <div
                className="hidden md:block absolute top-10 left-[calc(50%+4rem)] right-[calc(-50%+4rem)] h-[1px] bg-slate-200 dark:bg-slate-800"
                aria-hidden="true"
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default StepsSection;
