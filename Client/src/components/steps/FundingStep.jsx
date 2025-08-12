import  { useState, useEffect } from "react";
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent mb-2">
          Funding Details
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Set your funding goal and timeline
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Target Amount Input */}
        <div>
          <label className="block text-blue-900 dark:text-green-200 font-semibold mb-3">
            Target Amount <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400 text-lg select-none pointer-events-none">
              ₹
            </span>
            <input
              type="number"
              placeholder="Enter Target Amount"
              min={1}
              value={campaignData.targetAmount}
              onChange={(e) =>
                updateCampaignData("targetAmount", e.target.value)
              }
              onBlur={() => setTouched((t) => ({ ...t, targetAmount: true }))}
              className={`
                w-full pl-8 pr-4 py-3 rounded-xl shadow
                bg-white/80 dark:bg-slate-900/80
                text-blue-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                border-2 transition-all duration-200 text-lg
                ${
                  touched.targetAmount && errors.targetAmount
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-blue-200 dark:border-slate-700 focus:ring-2 focus:ring-green-300"
                }
                focus:outline-none
              `}
            />
          </div>
          {touched.targetAmount && errors.targetAmount && (
            <div className="flex items-center mt-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.targetAmount}
            </div>
          )}
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
            Set a realistic funding goal
          </p>
        </div>

        {/* Deadline Input */}
        <div>
          <label className="block text-blue-900 dark:text-green-200 font-semibold mb-3">
            Campaign Deadline <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            min={getMinDate(MIN_DAYS_LATER)}
            value={campaignData.deadline || ""}
            onChange={(e) => updateCampaignData("deadline", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, deadline: true }))}
            className={`
              w-full px-4 py-3 rounded-xl shadow
              bg-white/80 dark:bg-slate-900/80
              text-blue-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              border-2 transition-all duration-200 text-lg appearance-none
              ${
                touched.deadline && errors.deadline
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-blue-200 dark:border-slate-700 focus:ring-2 focus:ring-green-300"
              }
              focus:outline-none
            `}
          />
          {touched.deadline && errors.deadline && (
            <div className="flex items-center mt-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.deadline}
            </div>
          )}
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
            Please pick a future deadline (at least {MIN_DAYS_LATER} day
            {MIN_DAYS_LATER > 1 ? "s" : ""} later)
          </p>
        </div>
      </div>

      {/* Funding Tips */}
      <div className="bg-white/80 dark:bg-slate-900/80 rounded-xl p-5 sm:p-6 border border-blue-200 dark:border-slate-700 shadow">
        <div className="flex items-center mb-3">
          <Users className="w-5 h-5 text-green-400 mr-2" />
          <h3 className="text-blue-900 dark:text-green-200 font-semibold">
            Funding Tips
          </h3>
        </div>
        <ul className="space-y-2 text-blue-900 dark:text-green-100 text-sm">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Set a realistic goal based on your actual needs
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Consider platform fees and payment processing costs
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Shorter campaigns often perform better (30-45 days)
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Have a plan for promoting your campaign
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FundingStep;
