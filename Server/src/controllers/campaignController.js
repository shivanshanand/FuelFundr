import Campaign from "../models/Campaign.js";
import User from "../models/User.js";
import WalletTransaction from "../models/WalletTransaction.js";
import { evaluateAndAssignBadges } from "../utils/evaluateBadges.js";
import crypto from "crypto";
import Payment from "../models/Payment.js";

export const createCampaign = async (req, res) => {
  try {
    const { title, description, targetAmount, deadline, category } = req.body;

    if (!title || !description || !targetAmount || !deadline || !category) {
      return res
        .status(400)
        .json({ message: "All fields except image are required" });
    }

    const existing = await Campaign.findOne({
      title: { $regex: `^${title.trim()}$`, $options: "i" },
    });
    if (existing) {
      return res.status(409).json({
        message: "A campaign with this (or similar) title already exists!",
      });
    }

    const userBefore = await User.findById(req.userId);
    const badgesBefore = userBefore.badges ? [...userBefore.badges] : [];

    const imageUrl = req.file?.path || "";

    const newCampaign = new Campaign({
      title,
      description,
      targetAmount,
      deadline,
      category,
      image: imageUrl,
      createdBy: req.userId,
    });

    await newCampaign.save();
    await evaluateAndAssignBadges(req.userId);

    const userAfter = await User.findById(req.userId);
    const badgesAfter = userAfter.badges ? [...userAfter.badges] : [];

    // Determine which badges were newly unlocked
    const newBadges = badgesAfter.filter((b) => !badgesBefore.includes(b));

    console.log("badge unlocked", newBadges);

    res.status(201).json({ campaign: newCampaign, newBadges });
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ message: "Error creating campaign", error });
  }
};

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("createdBy", "name email");
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns", error });
  }
};

export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate(
      "createdBy",
      "name email bio badges"
    );
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    // Count campaigns by same creator
    const campaignCount = await Campaign.countDocuments({
      createdBy: campaign.createdBy._id,
    });

    // Add campaignCount as a property on createdBy
    const campaignObj = campaign.toObject();
    if (campaignObj.createdBy) {
      campaignObj.createdBy.campaignCount = campaignCount;
    }

    res.status(200).json(campaignObj); // <-- this is the key fix
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaign", error });
  }
};

export const withdrawFundsFromCampaign = async (req, res) => {
  try {
    const { amount } = req.body;
    const campaignId = req.params.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid withdrawal amount" });
    }

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Check if the requester is the campaign creator
    if (campaign.createdBy.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this campaign" });
    }

    // Withdrawal possible only up to available funds
    const availableToWithdraw =
      campaign.amountRaised - campaign.amountWithdrawn;
    if (amount > availableToWithdraw) {
      return res
        .status(400)
        .json({ message: "Insufficient available funds in campaign" });
    }

    // Keep-what-you-raise logic: increment amountWithdrawn
    campaign.amountWithdrawn += amount;

    // Optionally, when ALL funds are withdrawn and campaign is fulfilled, close the campaign
    if (
      campaign.amountWithdrawn >= campaign.amountRaised &&
      campaign.status === "fulfilled"
    ) {
      campaign.status = "closed";
    }

    await campaign.save();

    // Add to owner's wallet
    const user = await User.findById(req.userId);
    user.walletBalance += amount;

    await WalletTransaction.create({
      userId: req.userId,
      type: "WITHDRAWAL",
      amount,
      description: `Withdrawn from campaign: ${campaign.title}`,
    });

    await user.save();

    res.status(200).json({
      message: "Withdrawal successful",
      walletBalance: user.walletBalance,
      remainingCampaignFunds: campaign.amountRaised - campaign.amountWithdrawn,
      campaign,
    });
  } catch (error) {
    console.error("Error withdrawing funds:", error);
    res.status(500).json({ message: "Withdrawal failed", error });
  }
};

export const donateToCampaign = async (req, res) => {
  try {
    const { amount, donorName, donorEmail } = req.body;
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid donation amount" });
    }

    // OPTIONAL: Check if the campaign is closed/ended
    if (new Date(campaign.deadline) < new Date()) {
      return res.status(400).json({ message: "Campaign has ended" });
    }

    // --- Authenticated User Donation (with wallet) ---
    if (req.userId) {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.walletBalance < amount) {
        return res
          .status(400)
          .json({ message: "Insufficient balance in wallet" });
      }

      // --- 1. Get badges before donation
      const badgesBefore = user.badges ? [...user.badges] : [];

      user.walletBalance -= amount;
      user.totalDonated += amount;
      await user.save();

      // Log in donors array
      campaign.donors.push({ userId: req.userId, amount });

      // Log transaction
      await WalletTransaction.create({
        userId: req.userId,
        type: "DONATION",
        amount,
        description: `Donated to campaign: ${campaign.title}`,
      });

      // --- 2. Update badges after donation
      await evaluateAndAssignBadges(req.userId);
      await campaign.save();

      // --- 3. Get new badges
      const userAfter = await User.findById(req.userId);
      const badgesAfter = userAfter.badges ? [...userAfter.badges] : [];
      const newBadges = badgesAfter.filter((b) => !badgesBefore.includes(b));

      if (campaign.amountRaised >= campaign.targetAmount) {
        campaign.status = "fulfilled";
        await campaign.save();
      }

      campaign.amountRaised += amount;
      if (campaign.amountRaised >= campaign.targetAmount) {
        campaign.status = "fulfilled";
      }
      await campaign.save();

      return res.status(200).json({
        message: "Donation successful",
        newBadges,
        walletBalance: user.walletBalance,
        campaign,
      });
    }

    // --- Guest (Anonymous) Donation ---
    campaign.donors.push({
      userId: null,
      amount,
      name: donorName || "Guest",
      email: donorEmail || "guest123@gmail.com", // if provided by the frontend
    });
    campaign.amountRaised += amount;
    if (campaign.amountRaised >= campaign.targetAmount) {
      campaign.status = "fulfilled";
      await campaign.save();
    }
    await campaign.save();

    return res.status(200).json({
      message: "Donation successful",
      campaign,
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing donation", error });
  }
};

// Razorpay Signature Verification (reusable logic)
async function verifyPaymentDirect({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  amount,
  userId,
}) {
  try {
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !amount
    ) {
      return { success: false, message: "Missing payment details" };
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await Payment.create({
        user: userId || null,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        status: "SUCCESS",
      });
      return { success: true };
    } else {
      return { success: false, message: "Invalid signature" };
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    return { success: false, message: "Payment verification failed" };
  }
}

export const guestDonateHandler = async (req, res) => {
  try {
    const {
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donorName,
      donorEmail,
    } = req.body;

    console.log("[GUEST DONATE BODY]", req.body);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    // Verify Razorpay Payment
    const paymentResult = await verifyPaymentDirect({
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      // DON'T pass userId here for guests
    });
    if (!paymentResult.success) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        status: "FAILED",
      });
      return res.status(400).json({
        message: paymentResult.message || "Payment verification failed",
      });
    }

    campaign.donors.push({
      userId: null,
      amount,
      name: donorName || "Guest",
      email: donorEmail,
    });
    campaign.amountRaised += amount;
    if (campaign.amountRaised >= campaign.targetAmount) {
      campaign.status = "fulfilled";
    }
    await campaign.save();

    res.status(200).json({
      message: "Donation successful",
      campaign,
    });
  } catch (error) {
    console.error("Guest donation error -->", error); // ADD THIS!

    res.status(500).json({ message: "Error processing donation", error });
  }
};
