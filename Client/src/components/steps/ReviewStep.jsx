import { Check, Rocket, Code, Heart, Lightbulb, Users } from "lucide-react";

const categories = [
  { id: "Startup", name: "Startup", icon: Rocket, color: "bg-blue-700" },
  { id: "Hackathon", name: "Hackathon", icon: Code, color: "bg-green-600" },
  { id: "Project", name: "Project", icon: Lightbulb, color: "bg-purple-600" },
  {
    id: "Social Cause",
    name: "Social Cause",
    icon: Heart,
    color: "bg-red-600",
  },
  {
    id: "Creative",
    name: "Creative",
    icon: Users,
    color: "bg-yellow-400 text-black",
  },
];

const ReviewStep = ({ campaignData }) => {
  const selectedCategory = categories.find(
    (cat) => cat.id === campaignData.category
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const getFormattedDeadline = () => {
    if (!campaignData.deadline) return "";
    const deadline = new Date(campaignData.deadline);
    return deadline.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent mb-2">
          Review Your Campaign
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Double-check everything before publishing
        </p>
      </div>

      {/* Campaign Preview Card */}
      <div className="bg-white/85 dark:bg-slate-900/85 rounded-xl shadow border border-blue-200 dark:border-slate-800 overflow-hidden">
        {campaignData.image && (
          <div className="w-full h-44 sm:h-56 bg-gradient-to-r from-blue-200 to-green-100 dark:from-slate-800 dark:to-green-900">
            <img
              src={URL.createObjectURL(campaignData.image)}
              alt="Campaign preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-blue-900 dark:text-green-200 mb-2">
            {campaignData.title || "Campaign Title"}
          </h3>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
            {selectedCategory && (
              <span
                className={`px-3 py-1 text-white text-sm rounded-full flex items-center shadow ${selectedCategory.color}`}
              >
                <selectedCategory.icon className="w-4 h-4 mr-1" />
                {selectedCategory.name}
              </span>
            )}
            <span className="text-blue-700 dark:text-green-300 text-sm sm:text-base">
              Target: {formatCurrency(campaignData.targetAmount || 0)}
            </span>
            {campaignData.deadline && (
              <span className="text-purple-500 dark:text-yellow-300 text-sm sm:text-base">
                Until: {getFormattedDeadline()}
              </span>
            )}
          </div>
          <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            {campaignData.description ||
              "Campaign description will appear here"}
          </div>
          {/* Progress Bar Placeholder */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-blue-700 dark:text-green-400 font-medium">
                Progress
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                $0 raised
              </span>
            </div>
            <div className="w-full bg-blue-100 dark:bg-slate-800 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-700 to-green-400 dark:from-blue-600 dark:to-green-400 h-3 rounded-full transition-all duration-500"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Checklist */}
      <div className="bg-gradient-to-bl from-green-50 via-green-100 to-blue-50 dark:from-green-900 dark:via-green-950 dark:to-blue-900 border border-green-400 dark:border-green-700 rounded-xl p-6 shadow">
        <div className="flex items-center mb-3">
          <Check className="w-6 h-6 text-green-500 mr-3" />
          <h3 className="text-lg sm:text-xl font-bold text-green-900 dark:text-green-200">
            Ready to Launch!
          </h3>
        </div>
        <p className="text-green-900 dark:text-green-200 mb-4 text-sm sm:text-base">
          Your campaign is ready to go live. Once published, you can start
          sharing it with potential backers.
        </p>
        <div className="space-y-2">
          {[
            ["Campaign title", !!campaignData.title],
            ["Category selected", !!campaignData.category],
            [
              "Description added",
              campaignData.description && campaignData.description.length >= 50,
            ],
            ["Target amount set", !!campaignData.targetAmount],
            ["Deadline set", !!campaignData.deadline],
            ["Image uploaded", !!campaignData.image],
          ].map(([label, ok]) => (
            <div
              key={label}
              className="flex items-center text-green-700 dark:text-green-200 text-sm sm:text-base"
            >
              <Check className="w-4 h-4 mr-2" />
              <span>
                {label}: {ok ? "✓" : "✗"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Stats Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white/85 dark:bg-slate-900/85 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-slate-800 shadow flex flex-col text-center">
          <h4 className="text-blue-700 dark:text-green-200 font-semibold mb-2 text-base sm:text-lg">
            Target Amount
          </h4>
          <p className="text-xl sm:text-2xl font-extrabold text-blue-800 dark:text-green-300">
            {formatCurrency(campaignData.targetAmount || 0)}
          </p>
        </div>
        <div className="bg-white/85 dark:bg-slate-900/85 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-slate-800 shadow flex flex-col text-center">
          <h4 className="text-blue-700 dark:text-green-200 font-semibold mb-2 text-base sm:text-lg">
            End Date
          </h4>
          <p className="text-xl sm:text-2xl font-extrabold text-green-600 dark:text-green-400">
            {getFormattedDeadline() || "Not set"}
          </p>
        </div>
        <div className="bg-white/85 dark:bg-slate-900/85 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-slate-800 shadow flex flex-col text-center">
          <h4 className="text-blue-700 dark:text-green-200 font-semibold mb-2 text-base sm:text-lg">
            Category
          </h4>
          <p className="text-xl sm:text-2xl font-extrabold text-purple-700 dark:text-purple-300">
            {campaignData.category || "None"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
