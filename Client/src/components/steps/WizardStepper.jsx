const WizardStepper = ({ currentStep }) => {
  const steps = ["Basic Info", "Details", "Funding", "Review"];

  return (
    <div className="flex w-full items-center justify-between mb-8 relative px-2 sm:px-6">
      {/* Connector line */}
      <div className="absolute top-1/2 left-7 right-7 sm:left-8 sm:right-8 h-1 bg-gradient-to-r from-blue-200 via-green-200 to-blue-200 dark:from-slate-700 dark:via-green-900 dark:to-slate-700 z-0 rounded-full"></div>
      {steps.map((label, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isComplete = step < currentStep;
        const isLast = i === steps.length - 1;

        return (
          <div
            key={label}
            className="flex-1 flex flex-col items-center z-10 relative min-w-[65px] sm:min-w-[100px]"
          >
            <div
              className={`
                w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-bold border-4 
                transition-all duration-200 shadow-lg
                ${
                  isComplete
                    ? "bg-green-400 border-green-200 text-white"
                    : isActive
                    ? "bg-white dark:bg-slate-900 border-blue-400 text-blue-700 dark:text-green-300 ring-2 ring-blue-400 dark:ring-green-400"
                    : "bg-white/80 dark:bg-slate-800/60 border-blue-100 dark:border-slate-700 text-zinc-400"
                }
              `}
            >
              {isComplete ? (
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                step
              )}
            </div>
            <p
              className={`mt-1.5 text-xs sm:mt-2 sm:text-base font-medium text-center
                ${
                  isActive || isComplete
                    ? "text-blue-700 dark:text-green-300"
                    : "text-gray-400 dark:text-gray-500"
                }
              `}
              style={{
                maxWidth: 80,
                wordBreak: "break-word",
                lineHeight: "1.18",
              }}
            >
              {label}
            </p>
            {/* Spacer for future—no visible line needed between circles, handled by track */}
            {!isLast && (
              <div className="absolute top-1/2 right-0 w-full h-0.5 bg-transparent"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WizardStepper;
