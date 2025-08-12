import {
  ShieldCheck,
  Zap,
  Award,
  Smile,
  PieChart,
  ActivitySquare,
} from "lucide-react";

const reasons = [
  {
    icon: (
      <Zap className="w-9 h-9 sm:w-10 sm:h-10 text-green-400 animate-icon-bounce" />
    ),
    title: "0% Platform Fees",
    desc: "Every rupee you raise goes to your cause. We charge zero commission.",
  },
  {
    icon: (
      <ShieldCheck className="w-9 h-9 sm:w-10 sm:h-10 text-blue-500 animate-icon-pulse" />
    ),
    title: "Secure Transactions",
    desc: "Razorpay and bank-grade encryption—every contribution is super safe.",
  },
  {
    icon: (
      <Award className="w-9 h-9 sm:w-10 sm:h-10 text-yellow-400 animate-wiggle-slow" />
    ),
    title: "Earn Badges",
    desc: "Get recognized for funding, launching, or helping others succeed.",
  },
  {
    icon: (
      <PieChart className="w-9 h-9 sm:w-10 sm:h-10 text-pink-500 animate-flip" />
    ),
    title: "Visual Dashboard",
    desc: "See your impact, badges, wallet, and campaign analytics at a glance.",
  },
  {
    icon: (
      <ActivitySquare className="w-9 h-9 sm:w-10 sm:h-10 text-cyan-400 animate-pulse" />
    ),
    title: "Track Your Impact",
    desc: "Every rupee raised, badge earned, and milestone tracked instantly.",
  },
  {
    icon: (
      <Smile className="w-9 h-9 sm:w-10 sm:h-10 text-orange-400 animate-spin-slow" />
    ),
    title: "Student-First",
    desc: "Simple, friendly, and made for first-time fundraisers and backers.",
  },
];

const WhyChooseUs = () => (
  <section className="w-full py-14 px-2 sm:px-5 flex flex-col items-center bg-gradient-to-r from-blue-100 to-green-100 dark:from-slate-900 dark:to-green-950 transition-all">
    <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10 sm:mb-14 bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent tracking-tight">
      Why Choose Us?
    </h2>
    <div
      className="
      grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3
      gap-6 sm:gap-8 w-full max-w-5xl
    "
    >
      {reasons.map((reason) => (
        <div
          key={reason.title}
          className="rounded-2xl backdrop-blur-md bg-white/70 dark:bg-slate-900/60 shadow-xl flex flex-col items-center py-8 px-4 min-h-[230px] border border-blue-50 dark:border-slate-800 transition hover:scale-105 hover:shadow-2xl"
        >
          <div className="mb-3">{reason.icon}</div>
          <div className="font-bold text-blue-800 dark:text-green-300 text-lg mb-2 text-center">
            {reason.title}
          </div>
          <div className="text-gray-600 dark:text-green-100 text-center text-base">
            {reason.desc}
          </div>
        </div>
      ))}
    </div>
    <style>{`
      @keyframes icon-bounce {0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
      .animate-icon-bounce {animation:icon-bounce 1.5s infinite;}
      @keyframes icon-pulse {0%,100%{transform:scale(1);}50%{transform:scale(1.18);}}
      .animate-icon-pulse {animation:icon-pulse 1.5s infinite;}
      @keyframes wiggle {0%,100%{transform:rotate(-9deg);}50%{transform:rotate(12deg);}}
      .animate-wiggle-slow {animation:wiggle 2.7s infinite;}
      @keyframes flip {0%{transform:rotateY(0);}50%{transform:rotateY(180deg);}100%{transform:rotateY(0);}}
      .animate-flip {animation:flip 2.4s infinite;}
      .animate-spin-slow {animation:spin 3.5s linear infinite;}
    `}</style>
  </section>
);

export default WhyChooseUs;
