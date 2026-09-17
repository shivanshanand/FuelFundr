import { Check, Rocket, Code, Heart, Lightbulb, Users, X } from "lucide-react";

const categories = [
  { id: "Startup", name: "Startup", icon: Rocket, color: "text-indigo-500 bg-indigo-500/5 border-indigo-500/10" },
  { id: "Hackathon", name: "Hackathon", icon: Code, color: "text-emerald-500 bg-emerald-500/5 border-emerald-500/10" },
  { id: "Project", name: "Project", icon: Lightbulb, color: "text-amber-500 bg-amber-500/5 border-amber-500/10" },
  { id: "Social Cause", name: "Social Cause", icon: Heart, color: "text-rose-500 bg-rose-500/5 border-rose-500/10" },
  { id: "Creative", name: "Creative", icon: Users, color: "text-cyan-500 bg-cyan-500/5 border-cyan-500/10" },
];

const ReviewStep = ({ campaignData }) => {
  const selectedCategory = categories.find(
    (cat) => cat.id === campaignData.category
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const getFormattedDeadline = () => {
    if (!campaignData.deadline) return "";
    const deadline = new Date(campaignData.deadline);
    return deadline.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
          Review Campaign
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Double check all details before publishing
        </p>
      </div>

      {/* Preview Card */}
      <div className="yc-card overflow-hidden">
        {campaignData.image && (
          <div className="w-full h-40 bg-slate-100 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
            <img
              src={URL.createObjectURL(campaignData.image)}
              alt="Campaign preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-3">
            {campaignData.title || "Campaign Title"}
          </h3>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {selectedCategory && (
              <span
                className={`px-2.5 py-1 text-xs rounded-full font-semibold border flex items-center gap-1.5 ${selectedCategory.color}`}
              >
                <selectedCategory.icon className="w-3.5 h-3.5" />
                {selectedCategory.name}
              </span>
            )}
            <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">
              Target: <span className="font-bold text-slate-800 dark:text-slate-200">{formatCurrency(campaignData.targetAmount || 0)}</span>
            </span>
            {campaignData.deadline && (
              <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">
                Deadline: <span className="font-bold text-indigo-500">{getFormattedDeadline()}</span>
              </span>
            )}
          </div>
          
          <p className="text-slate-650 dark:text-slate-350 text-sm leading-relaxed whitespace-pre-line">
            {campaignData.description || "Campaign description will appear here."}
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="border border-emerald-500/15 bg-emerald-500/5 rounded-xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <Check className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-slate-800 dark:text-emerald-400 text-sm">
              Ready to Launch
            </h3>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-md">
            All required information is complete. Your campaign will go live on the platform instantly upon publishing.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs font-mono">
          {[
            ["Title set", !!campaignData.title],
            ["Category set", !!campaignData.category],
            ["Description min length", campaignData.description && campaignData.description.length >= 50],
            ["Goal amount set", !!campaignData.targetAmount],
            ["Deadline picked", !!campaignData.deadline],
            ["Image selected", !!campaignData.image],
          ].map(([label, ok]) => (
            <div
              key={label}
              className={`flex items-center gap-1.5 ${
                ok ? "text-emerald-500 font-bold" : "text-slate-400"
              }`}
            >
              {ok ? (
                <Check className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              )}
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
