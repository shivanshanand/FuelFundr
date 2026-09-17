import { useState, useEffect } from "react";
import { Users, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

const MIN_DAYS_LATER = 1;

const FundingStep = ({ campaignData, updateCampaignData, onValidated }) => {
  const [touched, setTouched] = useState({
    targetAmount: false,
    deadline: false,
  });
  const [errors, setErrors] = useState({});

  function getMinDate(days = 1) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  useEffect(() => {
    const newErrors = {};
    if (!campaignData.targetAmount || Number(campaignData.targetAmount) <= 0) {
      newErrors.targetAmount =
        "Target amount is required and must be a positive number";
    }
    if (!campaignData.deadline) {
      newErrors.deadline = "Please select a campaign deadline date";
    } else {
      const chosen = new Date(campaignData.deadline);
      const minAllowed = new Date(getMinDate(MIN_DAYS_LATER));
      chosen.setHours(0, 0, 0, 0);
      minAllowed.setHours(0, 0, 0, 0);
      if (chosen < minAllowed) {
        newErrors.deadline = `Deadline must be at least ${MIN_DAYS_LATER} day(s) in the future.`;
      }
    }
    setErrors(newErrors);
    if (onValidated) onValidated(Object.keys(newErrors).length === 0);
  }, [campaignData, onValidated]);

  useEffect(() => {
    if (touched.targetAmount && errors.targetAmount) {
      toast.dismiss("target-amount-toast");
      toast.error(errors.targetAmount, { toastId: "target-amount-toast" });
    }
    if (touched.deadline && errors.deadline) {
      toast.dismiss("deadline-toast");
      toast.error(errors.deadline, { toastId: "deadline-toast" });
    }
  }, [touched, errors]);

  const showError = (field) => touched[field] && errors[field];

  return (
    <div className="space-y-6 select-none">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
          Funding Details
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Set your campaign funding goal and deadline timeline
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Target Amount */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Target Amount (INR) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400 font-mono text-sm pointer-events-none select-none">
              ₹
            </span>
            <input
              type="number"
              placeholder="Goal Amount"
              min={1}
              value={campaignData.targetAmount}
              onChange={(e) =>
                updateCampaignData("targetAmount", e.target.value)
              }
              onBlur={() => setTouched((t) => ({ ...t, targetAmount: true }))}
              className={`
                w-full pl-8 pr-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950
                text-slate-900 dark:text-white placeholder-slate-450 outline-none
                border transition duration-150 text-sm font-mono
                ${
                  showError("targetAmount")
                    ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                    : "border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                }
              `}
            />
          </div>
          {showError("targetAmount") && (
            <div className="flex items-center text-rose-500 text-xs font-semibold mt-1">
              <AlertCircle className="w-3.5 h-3.5 mr-1" />
              Goal amount is required
            </div>
          )}
        </div>

        {/* Deadline */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Campaign Deadline <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            min={getMinDate(MIN_DAYS_LATER)}
            value={campaignData.deadline || ""}
            onChange={(e) => updateCampaignData("deadline", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, deadline: true }))}
            className={`
              w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950
              text-slate-900 dark:text-white placeholder-slate-450 outline-none
              border transition duration-150 text-sm font-mono
              ${
                showError("deadline")
                  ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                  : "border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              }
            `}
          />
          {showError("deadline") && (
            <div className="flex items-center text-rose-500 text-xs font-semibold mt-1">
              <AlertCircle className="w-3.5 h-3.5 mr-1" />
              Deadline date is required
            </div>
          )}
        </div>
      </div>

      {/* Tips Box */}
      <div className="rounded-xl border border-slate-200/65 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/20 p-5 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-indigo-500" />
          <h3 className="text-slate-800 dark:text-slate-200 font-bold text-xs">
            Funding Tips
          </h3>
        </div>
        <ul className="space-y-2 text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-medium">
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 mr-2.5 shrink-0" />
            Set a realistic target based on your materials and project requirements
          </li>
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 mr-2.5 shrink-0" />
            Shorter campaigns (30-45 days) usually build greater urgency and momentum
          </li>
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 mr-2.5 shrink-0" />
            Ensure you have a promotion plan to share your campaign with your campus network
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FundingStep;
