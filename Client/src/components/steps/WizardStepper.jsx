import { Check } from "lucide-react";

const WizardStepper = ({ currentStep }) => {
  const steps = ["Basic Info", "Details", "Funding", "Review"];

  return (
    <div className="flex w-full items-center justify-between mb-10 relative px-2 sm:px-6 select-none">
      {/* Connector line */}
      <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0 rounded-full"></div>
      
      {steps.map((label, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isComplete = step < currentStep;

        return (
          <div
            key={label}
            className="flex-1 flex flex-col items-center z-10 relative"
          >
            <div
              className={`
                w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-bold border-2 
                transition-all duration-200 shadow-sm text-sm
                ${
                  isComplete
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : isActive
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500"
                }
              `}
            >
              {isComplete ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                step
              )}
            </div>
            <p
              className={`mt-2 text-xs font-mono font-bold uppercase tracking-wider text-center
                ${
                  isActive || isComplete
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-400 dark:text-slate-500"
                }
              `}
              style={{
                maxWidth: 90,
                wordBreak: "break-word",
                lineHeight: "1.18",
              }}
            >
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default WizardStepper;
