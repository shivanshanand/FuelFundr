import  { useState, useEffect } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

const DetailsStep = ({
  campaignData,
  updateCampaignData,
  onValidationChange,
}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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

  const showError = (field) => touched[field] && errors[field];

  const ErrorMessage = ({ message }) => (
    <div className="flex items-center mt-2 text-red-500 text-sm">
      <AlertCircle className="w-4 h-4 mr-1" />
      {message}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-green-400 bg-clip-text text-transparent mb-2">
          Campaign Details
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Add detailed information and media
        </p>
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-blue-900 dark:text-green-200 font-semibold mb-3">
          Campaign Description <span className="text-red-400">*</span>
        </label>
        <textarea
          placeholder="Provide a detailed description of your campaign, including goals, timeline, and impact (minimum 50 characters)"
          value={campaignData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          onBlur={() => handleBlur("description")}
          rows={8}
          className={`
            w-full px-4 py-3 rounded-xl shadow bg-white/80 dark:bg-slate-900/80
            text-blue-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
            border-2 transition-all duration-200 text-base resize-none
            ${
              showError("description")
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-blue-200 dark:border-slate-700 focus:ring-2 focus:ring-green-300"
            }
            focus:outline-none
          `}
        />
        <div className="flex flex-col sm:flex-row justify-between items-center mt-2 gap-2 sm:gap-0">
          <div>
            {showError("description") && (
              <ErrorMessage message={errors.description} />
            )}
          </div>
          <div
            className={`text-sm ${
              campaignData.description.length < 50
                ? "text-red-400"
                : campaignData.description.length < 100
                ? "text-yellow-500"
                : "text-gray-400 dark:text-gray-300"
            }`}
          >
            {campaignData.description.length} characters
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-blue-900 dark:text-green-200 font-semibold mb-3">
          Campaign Image <span className="text-red-400">*</span>
        </label>
        <div
          className={`
            border-2 border-dashed rounded-xl p-5 sm:p-8 text-center transition-colors duration-200 shadow bg-white/80 dark:bg-slate-900/70
            ${
              showError("image")
                ? "border-red-500"
                : "border-blue-200 dark:border-slate-700"
            }
          `}
        >
          <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 dark:text-green-300 mx-auto mb-4" />
          <h3 className="text-blue-900 dark:text-green-200 font-semibold mb-2 text-base sm:text-lg">
            Upload your campaign image
          </h3>
          <p className="text-gray-500 dark:text-gray-300 text-sm mb-4">
            PNG, JPG, WebP up to 10MB
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
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-700 to-green-400 text-white rounded-lg cursor-pointer font-semibold hover:bg-blue-800 transition-colors duration-200"
          >
            Choose File
          </label>
          {campaignData.image && (
            <div className="mt-4">
              <p className="text-green-500 text-sm">
                ✓ File selected: {campaignData.image.name}
              </p>
              <p className="text-gray-400 dark:text-gray-300 text-xs">
                Size: {(campaignData.image.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>
        {showError("image") && <ErrorMessage message={errors.image} />}
      </div>

      {/* Image Preview */}
      {campaignData.image && (
        <div>
          <label className="block text-blue-900 dark:text-green-200 font-semibold mb-3">
            Image Preview
          </label>
          <div className="bg-white/85 dark:bg-slate-900/85 rounded-xl p-4 border border-blue-200 dark:border-slate-700 shadow">
            <img
              src={URL.createObjectURL(campaignData.image)}
              alt="Campaign preview"
              className="w-full max-h-[15rem] object-cover rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsStep;
