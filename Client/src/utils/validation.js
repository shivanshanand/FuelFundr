// Validation utility functions
export const validateBasicInfo = (campaignData) => {
  const errors = {};

  if (!campaignData.title || campaignData.title.trim().length === 0) {
    errors.title = "Campaign title is required";
  } else if (campaignData.title.trim().length < 5) {
    errors.title = "Campaign title must be at least 5 characters long";
  }

  if (!campaignData.category) {
    errors.category = "Please select a category";
  }

  if (
    !campaignData.shortDescription ||
    campaignData.shortDescription.trim().length === 0
  ) {
    errors.shortDescription = "Short description is required";
  } else if (campaignData.shortDescription.trim().length < 20) {
    errors.shortDescription =
      "Short description must be at least 20 characters long";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateDetails = (campaignData) => {
  const errors = {};

  if (
    !campaignData.description ||
    campaignData.description.trim().length === 0
  ) {
    errors.description = "Full description is required";
  } else if (campaignData.description.trim().length < 100) {
    errors.description =
      "Full description must be at least 100 characters long";
  }

  if (!campaignData.image) {
    errors.image = "Campaign image is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateFunding = (campaignData) => {
  const errors = {};

  if (!campaignData.goal || campaignData.goal <= 0) {
    errors.goal = "Please enter a valid funding goal";
  } else if (campaignData.goal < 100) {
    errors.goal = "Minimum funding goal is $100";
  } else if (campaignData.goal > 1000000) {
    errors.goal = "Maximum funding goal is $1,000,000";
  }

  if (!campaignData.deadline) {
    errors.deadline = "Please select campaign duration";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
