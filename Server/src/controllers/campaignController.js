import Campaign from "../models/Campaign.js";
import User from "../models/User.js";
import WalletTransaction from "../models/WalletTransaction.js";
import { evaluateAndAssignBadges } from "../utils/evaluateBadges.js";
import Payment from "../models/Payment.js";
import { v2 as cloudinary } from "cloudinary";
import { verifyPaymentDirect } from "../utils/paymentVerifier.js";

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "campaign_images" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    stream.end(buffer);
  });
};

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

    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

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



    res.status(201).json({ campaign: newCampaign, newBadges });
  } catch (error) {

    res.status(500).json({ message: "Error creating campaign", error });
  }
};

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("createdBy", "name email");
    
    const modifiedCampaigns = campaigns.map((campaign) => {
      const obj = campaign.toObject();
      return {
        ...obj,
        campaignTitle: campaign.title,
      };
    });

    res.status(200).json(modifiedCampaigns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns", error });
  }
};

export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate(
      "createdBy",
      "name email bio badges",
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

    const currentAmountWithdrawn = campaign.amountWithdrawn;

    // Optimistically update the campaign using findOneAndUpdate to prevent race conditions
    const updatedCampaign = await Campaign.findOneAndUpdate(
      { _id: campaignId, amountWithdrawn: currentAmountWithdrawn },
      { $inc: { amountWithdrawn: amount } },
      { new: true }
    );

    if (!updatedCampaign) {
      return res.status(409).json({ message: "Withdrawal conflict detected. Please try again." });
    }

    // Update campaign status if fulfilled and fully withdrawn
    if (
      updatedCampaign.amountWithdrawn >= updatedCampaign.amountRaised &&
      updatedCampaign.status === "fulfilled"
    ) {
      await Campaign.updateOne({ _id: campaignId }, { status: "closed" });
      updatedCampaign.status = "closed";
    }

    // Add to owner's wallet atomically
    const user = await User.findOneAndUpdate(
      { _id: req.userId },
      { $inc: { walletBalance: amount } },
      { new: true }
    );

    await WalletTransaction.create({
      userId: req.userId,
      type: "WITHDRAWAL",
      amount,
      description: `Withdrawn from campaign: ${campaign.title}`,
    });

    res.status(200).json({
      message: "Withdrawal successful",
      walletBalance: user.walletBalance,
      remainingCampaignFunds: updatedCampaign.amountRaised - updatedCampaign.amountWithdrawn,
      campaign: updatedCampaign,
    });
  } catch (error) {

    res.status(500).json({ message: "Withdrawal failed", error });
  }
};

export const donateToCampaign = async (req, res) => {
  try {
    const { amount } = req.body;
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid donation amount" });
    }

    // Check if the campaign has ended
    if (new Date(campaign.deadline) < new Date()) {
      return res.status(400).json({ message: "Campaign has ended" });
    }

    // --- Authenticated User Donation (with wallet) ---
    if (req.userId) {
      // 1. Atomically deduct from user's wallet
      const user = await User.findOneAndUpdate(
        { _id: req.userId, walletBalance: { $gte: amount } },
        { $inc: { walletBalance: -amount, totalDonated: amount } },
        { new: false } // get user state BEFORE update to capture badgesBefore
      );
      if (!user) {
        return res.status(400).json({ message: "Insufficient balance in wallet or user not found" });
      }

      const badgesBefore = user.badges ? [...user.badges] : [];

      // 2. Log transaction
      await WalletTransaction.create({
        userId: req.userId,
        type: "DONATION",
        amount,
        description: `Donated to campaign: ${campaign.title}`,
      });

      // 3. Atomically update campaign raised amount and donor subdocument
      const updatedCampaign = await Campaign.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { amountRaised: amount },
          $push: {
            donors: {
              userId: req.userId,
              amount,
              name: user.name,
              email: user.email,
            },
          },
        },
        { new: true }
      );

      if (!updatedCampaign) {
        // Rollback wallet balance if campaign update fails
        await User.updateOne({ _id: req.userId }, { $inc: { walletBalance: amount, totalDonated: -amount } });
        return res.status(404).json({ message: "Campaign not found" });
      }

      // Check target status fulfillment
      if (updatedCampaign.amountRaised >= updatedCampaign.targetAmount && updatedCampaign.status !== "fulfilled") {
        await Campaign.updateOne({ _id: req.params.id }, { status: "fulfilled" });
        updatedCampaign.status = "fulfilled";
      }

      // 4. Update badges
      await evaluateAndAssignBadges(req.userId);

      // 5. Get newly unlocked badges
      const userAfter = await User.findById(req.userId);
      const badgesAfter = userAfter.badges ? [...userAfter.badges] : [];
      const newBadges = badgesAfter.filter((b) => !badgesBefore.includes(b));

      return res.status(200).json({
        message: "Donation successful",
        newBadges,
        walletBalance: userAfter.walletBalance,
        campaign: updatedCampaign,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error processing donation", error });
  }
};

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



    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Verify Razorpay Payment (using shared verifier)
    const paymentResult = await verifyPaymentDirect({
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
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

    if (paymentResult.alreadyProcessed) {
      return res.status(200).json({
        message: "Donation successful (already processed)",
        campaign,
      });
    }

    // Atomically update campaign raised amount and push guest donor details
    const updatedCampaign = await Campaign.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { amountRaised: amount },
        $push: {
          donors: {
            userId: null,
            amount,
            name: donorName || "Guest",
            email: donorEmail,
          },
        },
      },
      { new: true }
    );

    // Update status if fulfilled
    if (updatedCampaign.amountRaised >= updatedCampaign.targetAmount && updatedCampaign.status !== "fulfilled") {
      await Campaign.updateOne({ _id: req.params.id }, { status: "fulfilled" });
      updatedCampaign.status = "fulfilled";
    }

    res.status(200).json({
      message: "Donation successful",
      campaign: updatedCampaign,
    });
  } catch (error) {

    res.status(500).json({ message: "Error processing donation", error });
  }
};
