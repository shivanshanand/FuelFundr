import { useState } from "react";
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
      color: "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20",
    },
    {
      id: "Hackathon",
      name: "Hackathon",
      icon: Code,
      description: "Fund your hackathon project",
      color: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    },
    {
      id: "Project",
      name: "Project",
      icon: Lightbulb,
      description: "Bring your research project to life",
      color: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
    },
    {
      id: "Social Cause",
      name: "Social Cause",
      icon: Heart,
      description: "Make a positive impact on society",
      color: "bg-rose-500/10 text-rose-500 border border-rose-500/20",
    },
    {
      id: "Creative",
      name: "Creative",
      icon: Users,
      description: "Express your artistic vision",
      color: "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20",
    },
  ];

  const isTitleError =
    touched.title && (!campaignData.title || campaignData.title.trim() === "");
  const isCategoryError =
    touched.category &&
    (!campaignData.category || campaignData.category.trim() === "");

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
    <div className="space-y-6 select-none">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
          Basic Information
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Let's start with the basics of your campaign
        </p>
      </div>

      {/* Title Input */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Campaign Title <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter a compelling title for your campaign"
          required
          value={campaignData.title}
          onChange={(e) => updateCampaignData("title", e.target.value)}
          onBlur={handleTitleBlur}
          className={`
            w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950
            text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-650
            border outline-none transition duration-150 text-sm
            ${
              isTitleError
                ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                : "border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            }
          `}
        />
        {isTitleError && (
          <div className="flex items-center text-rose-500 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5 mr-1" /> Title is required
          </div>
        )}
      </div>

      {/* Categories Grid */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Category <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const selected = campaignData.category === category.id;
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  p-5 rounded-xl cursor-pointer border transition duration-200
                  flex flex-col items-center text-center select-none
                  ${
                    selected
                      ? "border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500"
                      : isCategoryError
                      ? "border-rose-500 bg-rose-500/5"
                      : "border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/20 hover:border-indigo-500"
                  }
                `}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${category.color}`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-slate-800 dark:text-slate-200 font-bold mb-1 text-sm sm:text-base">
                  {category.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-[200px]">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
        {isCategoryError && (
          <div className="flex items-center text-rose-500 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5 mr-1" /> Category is required
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfoStep;
