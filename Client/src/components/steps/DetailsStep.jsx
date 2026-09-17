import { useState, useEffect } from "react";
import { Upload, AlertCircle, Sparkles } from "lucide-react";
import { toast } from "react-toastify";

const DetailsStep = ({
  campaignData,
  updateCampaignData,
  onValidationChange,
}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [aiLoading, setAiLoading] = useState(false);
  const [tone, setTone] = useState("Inspiring");
  const [length, setLength] = useState("medium");
  const [previewUrl, setPreviewUrl] = useState(null);

  // Manage image preview URL creation and cleanup
  useEffect(() => {
    if (!campaignData.image) {
      setPreviewUrl(null);
      return;
    }

    if (campaignData.image instanceof File || campaignData.image instanceof Blob) {
      const objectUrl = URL.createObjectURL(campaignData.image);
      setPreviewUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else if (typeof campaignData.image === "string") {
      setPreviewUrl(campaignData.image);
    }
  }, [campaignData.image]);

  // Validation
  const validateDetails = (data) => {
    const errors = {};
    if (!data.description || data.description.trim().length === 0) {
      errors.description = "Description is required";
    } else if (data.description.trim().length < 50) {
      errors.description = "Description must be at least 50 characters long";
    }
    if (!data.image) {
      errors.image = "Campaign image is required";
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  useEffect(() => {
    const validation = validateDetails(campaignData);
    setErrors(validation.errors);
    if (onValidationChange) {
      onValidationChange("details", validation.isValid);
    }
  }, [campaignData, onValidationChange]);

  const handleInputChange = (field, value) => {
    updateCampaignData(field, value);
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (errors[field]) {
      toast.error(errors[field]);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("File size must be less than 10MB");
        return;
      }
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, WebP)");
        return;
      }
      handleInputChange("image", file);
    }
  };

  const handleRewrite = async () => {
    try {
      if (!campaignData.description || campaignData.description.length < 20) {
        toast.error("Write something first before using AI ✨");
        return;
      }

      setAiLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/ai/rewrite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          description: campaignData.description,
          tone,
          length,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      updateCampaignData("description", data.content);

      toast.success("✨ AI just upgraded your description!");
    } catch (err) {
      toast.error(err.message || "AI failed");
    } finally {
      setAiLoading(false);
    }
  };

  const showError = (field) => touched[field] && errors[field];

  const ErrorMessage = ({ message }) => (
    <div className="flex items-center mt-2 text-rose-500 text-xs font-semibold">
      <AlertCircle className="w-3.5 h-3.5 mr-1" />
      {message}
    </div>
  );

  return (
    <div className="space-y-6 select-none">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
          Campaign Details
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Add detailed description information and cover media
        </p>
      </div>

      {/* Description Field */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Campaign Description <span className="text-rose-500">*</span>
        </label>

        <textarea
          placeholder="Provide a detailed description of your campaign, including goals, timeline, and impact (minimum 50 characters)"
          value={campaignData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          onBlur={() => handleBlur("description")}
          rows={7}
          className={`
            w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-950
            text-slate-900 dark:text-white placeholder-slate-450 dark:placeholder-slate-650
            border outline-none transition duration-150 text-sm resize-none
            ${
              showError("description")
                ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                : "border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            }
          `}
        />

        <div className="flex flex-col sm:flex-row justify-between items-center mt-1 gap-2">
          <div>
            {showError("description") && (
              <ErrorMessage message={errors.description} />
            )}
          </div>

          <div
            className={`text-xs font-mono ${
              campaignData.description.length < 50
                ? "text-rose-500"
                : "text-slate-450 dark:text-slate-500"
            }`}
          >
            {campaignData.description.length} characters
          </div>
        </div>

        {/* AI Rewrite Options */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-3 p-4 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/20">
          <div className="flex items-center gap-3">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
            >
              <option>Inspiring</option>
              <option>Professional</option>
              <option>Casual and friendly</option>
              <option>Urgency-driven</option>
              <option>Storytelling</option>
            </select>

            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
            >
              <option value="short">Short Length</option>
              <option value="medium">Medium Length</option>
              <option value="long">Long Length</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleRewrite}
            disabled={aiLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {aiLoading ? "Generating..." : "AI Rewrite"}
          </button>
        </div>
      </div>

      {/* Image Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Campaign Image <span className="text-rose-500">*</span>
        </label>
        
        <div
          className={`
            border border-dashed rounded-xl p-8 text-center transition-colors duration-200 bg-slate-50/50 dark:bg-slate-950/20
            ${
              showError("image")
                ? "border-rose-500"
                : "border-slate-200 dark:border-white/5 hover:border-indigo-500"
            }
          `}
        >
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3 animate-bounce-custom" />
          <h3 className="text-slate-800 dark:text-slate-200 font-bold mb-1 text-sm sm:text-base">
            Upload campaign cover photo
          </h3>
          <p className="text-slate-400 dark:text-slate-500 text-xs mb-4">
            PNG, JPG or WebP up to 10MB
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-block px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-lg cursor-pointer hover:border-indigo-500 bg-white dark:bg-slate-900 transition-all duration-200 shadow-sm"
          >
            Choose File
          </label>
          
          {campaignData.image && (
            <div className="mt-4 border-t border-slate-100 dark:border-slate-850 pt-3">
              <p className="text-emerald-500 text-xs font-semibold">
                ✓ File selected: {campaignData.image.name || "Custom Uploaded Cover"}
              </p>
              {campaignData.image.size && (
                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-mono mt-0.5">
                  Size: {(campaignData.image.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </div>
          )}
        </div>
        {showError("image") && <ErrorMessage message={errors.image} />}
      </div>

      {/* Image Preview */}
      {previewUrl && (
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Cover Photo Preview
          </label>
          <div className="bg-white dark:bg-slate-900/50 rounded-xl p-3 border border-slate-200 dark:border-white/5 shadow-sm">
            <img
              src={previewUrl}
              alt="Campaign cover preview"
              className="w-full max-h-[160px] object-cover rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsStep;
