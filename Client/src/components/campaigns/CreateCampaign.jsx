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
    <>
      <CreateCampaignNavbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-blue-900 transition-colors duration-300 p-0 md:p-6">
        <div className="pt-5 px-2 sm:pl-6">
          <button
            onClick={() =>
              window.history.length > 1 ? navigate(-1) : navigate("/")
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-green-400 text-white font-bold shadow hover:from-blue-800 hover:to-green-700 transition text-sm md:text-base"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
        <div className="max-w-4xl mx-auto mt-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent">
              Create Your Campaign
            </h1>
            <div className="px-4 py-2 bg-gradient-to-r from-blue-700 to-green-400 text-white rounded-full text-sm font-medium shadow">
              Step {currentStep} of 4
            </div>
          </div>

          {/* Premium Themed Timeline Stepper */}
          <WizardStepper currentStep={currentStep} />

          {/* Error Message */}
          {error && (
            <div className="bg-red-900 border border-red-700 rounded-xl p-4 mb-6 shadow">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {/* Main Wizard Card */}
          <div className="bg-white/90 dark:bg-slate-900/80 rounded-2xl p-8 mb-8 border border-blue-200 dark:border-slate-800 shadow-lg">
            {/* Step Content */}
            {currentStep === 1 && <BasicInfoStep {...stepProps} />}
            {currentStep === 2 && <DetailsStep {...stepProps} />}
            {currentStep === 3 && <FundingStep {...stepProps} />}
            {currentStep === 4 && <ReviewStep campaignData={campaignData} />}

            {/* Navigation */}
            <div className="flex justify-between gap-4 mt-10 flex-wrap">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1 || isLoading}
                className={`flex items-center px-5 py-2 rounded-lg font-semibold border border-blue-200 dark:border-slate-700 shadow text-lg transition-colors duration-200 ${
                  currentStep === 1 || isLoading
                    ? "text-gray-400 bg-transparent cursor-not-allowed"
                    : "text-blue-700 dark:text-green-300 bg-white/70 dark:bg-slate-900/70 hover:bg-blue-50 dark:hover:bg-slate-800"
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Previous
              </button>
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="flex items-center px-5 py-2 text-white rounded-lg font-semibold text-lg transition-colors duration-200 bg-gradient-to-r from-green-400 to-blue-600 shadow hover:from-green-500 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center px-5 py-2 text-white rounded-lg font-semibold text-lg transition-colors duration-200 bg-gradient-to-r from-green-500 to-blue-500 shadow hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating...
                    </span>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5 mr-2" />
                      Publish Campaign
                    </>
                  )}
                </button>
              )}
            </div>
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
    </>
  );
};

export default CreateCampaign;
