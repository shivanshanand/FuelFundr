import { UserPlus, Rocket, Wallet } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="w-10 h-10 text-blue-500 animate-wiggle" />,
    title: "Register",
    desc: "Sign up for free and join the community.",
  },
  {
    icon: <Rocket className="w-10 h-10 text-green-400 animate-bounce" />,
    title: "Create Campaign",
    desc: "Share your story and set your funding goal.",
  },
  {
    icon: <Wallet className="w-10 h-10 text-yellow-400 animate-flip" />,
    title: "Receive Funds",
    desc: "Get instant support and start building your dream.",
  },
];

const StepsSection = () => (
  <section className="w-full px-3 md:px-0 py-14 md:py-24 bg-transparent flex flex-col items-center">
    <h2 className="text-[1.5rem] sm:text-[2.3rem] md:text-[2.7rem] font-extrabold mb-12 text-center bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent leading-tight tracking-tight drop-shadow">
      New to Fundraising?
      <br className="sm:hidden" />
      <span className="block md:inline"> Raise in 3 Simple Steps</span>
    </h2>
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 gap-x-0 md:gap-x-10 items-stretch">
      {steps.map((step, idx) => (
        <div
          key={step.title}
          className="flex flex-col gap-4 items-center text-center relative min-w-0"
        >
          <div className="mx-auto rounded-full bg-white/80 dark:bg-slate-900/80 shadow-2xl border-2 border-blue-100 dark:border-green-900 flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-2">
            {step.icon}
          </div>
          <div className="font-bold text-lg sm:text-xl text-blue-700 dark:text-green-400">
            {step.title}
          </div>
          <div className="text-gray-600 dark:text-green-100 text-[1.05rem] px-2 md:px-0">
            {step.desc}
          </div>
          {/* Connector Arrow */}
          {idx < steps.length - 1 && (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              className="hidden md:block absolute top-1/2 right-[-30px] -translate-y-1/2 text-blue-400 animate-pulse"
            >
              <path
                d="M6 16 H26 M22 12 L26 16 L22 20"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
    <style>{`
      @keyframes wiggle {
        0%, 100% { transform: rotate(-7deg);}
        50% { transform: rotate(8deg);}
      }
      .animate-wiggle { animation: wiggle 1.4s infinite;}
      .animate-flip { animation: flip 1.2s infinite; }
      @keyframes flip {0% {transform: rotateY(0);} 50% {transform: rotateY(180deg);} 100% {transform: rotateY(0);}
      }
      .animate-bounce { animation: bounce 1.3s infinite; }
      @keyframes bounce {
        0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);}
      }
    `}</style>
  </section>
);

export default StepsSection;
