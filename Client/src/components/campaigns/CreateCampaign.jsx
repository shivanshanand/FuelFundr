import React, { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Rocket } from "lucide-react";
import { useCampaignStore } from "../../store/campaignStore";
import BasicInfoStep from "../steps/BasicInfoStep";
import DetailsStep from "../steps/DetailsStep";
import FundingStep from "../steps/FundingStep";
import ReviewStep from "../steps/ReviewStep";
import CreateCampaignNavbar from "../navbar/CreateCampaignNavbar";
import WizardStepper from "../steps/WizardStepper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BadgeModal from "../modals/BadgeModal";

const CreateCampaign = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    createCampaign,
    isLoading,
    error,
    badgeModalVisible,
    unlockedBadges,
    resetBadgeModal,
  } = useCampaignStore();
  const navigate = useNavigate();

  const [campaignData, setCampaignData] = useState({
    title: "",
    category: "",
    description: "",
    targetAmount: "",
    deadline: "",
    image: null,
  });

  const handleNext = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const handlePrevious = () =>
    currentStep > 1 && setCurrentStep(currentStep - 1);

  const updateCampaignData = (field, value) => {
    setCampaignData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const requiredFields = [
        "title",
        "category",
        "description",
        "targetAmount",
        "deadline",
      ];
      const missingFields = requiredFields.filter((field) => {
        const value = campaignData[field];
        return !value || value.toString().trim() === "";
      });
      if (missingFields.length > 0) {
        alert(`Missing required fields: ${missingFields.join(", ")}`);
        return;
      }
      if (!campaignData.image) {
        alert("Please upload a campaign image");
        return;
      }
      const formData = new FormData();
      formData.append("title", campaignData.title.trim());
      formData.append("description", campaignData.description.trim());
      formData.append("targetAmount", campaignData.targetAmount.toString());
      formData.append("category", campaignData.category);
      // Use ISO string for deadline field
      formData.append(
        "deadline",
        new Date(campaignData.deadline).toISOString()
      );
      if (campaignData.image && campaignData.image instanceof File) {
        formData.append("image", campaignData.image);
      } else {
        alert("Please select a valid image file");
        return;
      }

      const response = await createCampaign(formData);
      toast.success("Campaign created successfully!");

      setCampaignData({
        title: "",
        category: "",
        description: "",
        targetAmount: "",
        deadline: "",
        image: null,
      });
      setCurrentStep(1);
      // Only navigate after user closes modal!
      if (response?.newBadges && response.newBadges.length > 0) {
        // Wait for modal to close, then navigate in BadgeModal's onClose callback
        // Don't call navigate("/campaigns") here
      } else {
        navigate("/campaigns");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create campaign"
      );
    }
  };

  const stepProps = { campaignData, updateCampaignData };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <CreateCampaignNavbar />
      
      <div className="max-w-3xl w-full mx-auto px-6 py-10 flex-grow">
        {/* Back navigation */}
        <div className="mb-6">
          <button
            onClick={() =>
              window.history.length > 1 ? navigate(-1) : navigate("/")
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-indigo-500 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer shadow-sm transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-2">
          <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">
            Create Campaign
          </h1>
          <div className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Step {currentStep} of 4
          </div>
        </div>

        {/* Stepper progress indicator */}
        <WizardStepper currentStep={currentStep} />

        {/* Error notification */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl p-4 mb-6 text-sm font-semibold">
            {error}
          </div>
        )}

        {/* Wizard Main Card */}
        <div className="yc-card p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm">
          {/* Active wizard step */}
          <div className="mb-8">
            {currentStep === 1 && <BasicInfoStep {...stepProps} />}
            {currentStep === 2 && <DetailsStep {...stepProps} />}
            {currentStep === 3 && <FundingStep {...stepProps} />}
            {currentStep === 4 && <ReviewStep campaignData={campaignData} />}
          </div>

          {/* Stepper buttons action block */}
          <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800/40 pt-6">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1 || isLoading}
              className={`flex items-center px-4 py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                currentStep === 1 || isLoading
                  ? "text-slate-300 dark:text-slate-700 border-slate-100 dark:border-slate-850 cursor-not-allowed bg-transparent"
                  : "text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-indigo-500 bg-white dark:bg-slate-900"
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1 text-slate-400" />
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={isLoading}
                className="flex items-center px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </span>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 mr-1.5" />
                    Publish Campaign
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <BadgeModal
        show={badgeModalVisible}
        badges={unlockedBadges}
        onClose={() => {
          resetBadgeModal();
          navigate("/campaigns");
        }}
      />
    </div>
  );
};

export default CreateCampaign;
