import Campaign from "../models/Campaign.js";
import User from "../models/User.js";
import WalletTransaction from "../models/WalletTransaction.js";

export const evaluateAndAssignBadges = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return;

  const campaigns = await Campaign.find({ createdBy: userId });

  const donationTx = await WalletTransaction.find({
    userId,
    type: "DONATION",
  });

  const totalDonated = donationTx.reduce((sum, tx) => sum + tx.amount, 0);

  const newBadges = new Set(user.badges || []);

  if (donationTx.length >= 1) newBadges.add("First Donation");
  if (donationTx.length >= 3) newBadges.add("Contributor");
  if (totalDonated >= 1000) newBadges.add("Supporter");

  if (campaigns.length >= 1) newBadges.add("Campaigner");
  if (campaigns.length >= 3) newBadges.add("Fundraiser");

  user.badges = Array.from(newBadges);
  await user.save();
};
