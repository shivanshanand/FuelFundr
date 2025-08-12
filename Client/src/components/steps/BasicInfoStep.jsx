import  { useState } from "react";
import {
  Rocket,
  Code,
  Heart,
  Lightbulb,
  Users,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const BasicInfoStep = ({ campaignData, updateCampaignData }) => {
  const [touched, setTouched] = useState({ title: false, category: false });
  const categories = [
    {
      id: "Startup",
      name: "Startup",
      icon: Rocket,
      description: "Launch your innovative business idea",
      color: "bg-blue-700",
    },
    {
      id: "Hackathon",
      name: "Hackathon",
      icon: Code,
      description: "Fund your hackathon project",
      color: "bg-green-600",
    },
    {
      id: "Project",
      name: "Project",
      icon: Lightbulb,
      description: "Bring your research project to life",
      color: "bg-purple-600",
    },
    {
      id: "Social Cause",
      name: "Social Cause",
      icon: Heart,
      description: "Make a positive impact on society",
      color: "bg-red-600",
    },
    {
      id: "Creative",
      name: "Creative",
      icon: Users,
      description: "Express your artistic vision",
      color: "bg-yellow-400 text-black",
    },
  ];

  const isTitleError =
    touched.title && (!campaignData.title || campaignData.title.trim() === "");
  const isCategoryError =
    touched.category &&
    (!campaignData.category || campaignData.category.trim() === "");

  // Validation + toast
  const handleTitleBlur = () => {
    setTouched((t) => ({ ...t, title: true }));
    if (!campaignData.title || campaignData.title.trim() === "") {
      toast.error("Title is required");
    }
  };
  const handleCategoryClick = (catId) => {
    updateCampaignData("category", catId);
    setTouched((t) => ({ ...t, category: true }));
    if (!catId) {
      toast.error("Category is required");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent mb-2">
          Basic Information
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Let's start with the basics of your campaign
        </p>
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-blue-900 dark:text-green-200 font-semibold mb-3">
          Campaign Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter a compelling title for your campaign"
          required
          value={campaignData.title}
          onChange={(e) => updateCampaignData("title", e.target.value)}
          onBlur={handleTitleBlur}
          className={`
            w-full px-4 py-3 rounded-xl shadow bg-white/80 dark:bg-slate-900/80
            text-blue-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
            border-2 transition-all duration-200 text-lg
            ${
              isTitleError
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-blue-200 dark:border-slate-700 focus:ring-2 focus:ring-green-300"
            }
            focus:outline-none
          `}
        />
        {isTitleError && (
          <div className="flex items-center mt-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" /> Title is required
          </div>
        )}
      </div>

      {/* Categories */}
      <div>
        <label className="block text-blue-900 dark:text-green-200 font-semibold mb-3">
          Category <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const selected = campaignData.category === category.id;
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  p-6 rounded-xl cursor-pointer border-2 transition-all duration-200
                  flex flex-col items-center text-center shadow min-w-0
                  ${
                    selected
                      ? "border-green-400 ring-2 ring-green-200 bg-gradient-to-r from-blue-50 via-green-50 to-blue-100 dark:from-slate-800 dark:via-slate-900 dark:to-green-900"
                      : isCategoryError
                      ? "border-red-500 bg-white/70 dark:bg-slate-800"
                      : "border-blue-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 hover:ring-1 hover:ring-blue-700"
                  }
                `}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 shadow ${category.color}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-blue-900 dark:text-green-200 font-bold mb-0.5 text-base sm:text-lg">
                  {category.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
        {isCategoryError && (
          <div className="flex items-center mt-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" /> Category is required
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfoStep;
