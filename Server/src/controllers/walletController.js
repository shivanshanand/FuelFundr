import User from "../models/User.js";
import Payment from "../models/Payment.js";
import WalletTransaction from "../models/WalletTransaction.js";
import mongoose from "mongoose";
import { verifyPaymentDirect } from "../utils/paymentVerifier.js";

// Get Wallet Balance
export const getWalletBalance = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("walletBalance");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ walletBalance: user.walletBalance });
  } catch (error) {

    res.status(500).json({ message: "Error fetching wallet balance" });
  }
};

// Add Funds to Wallet (after Razorpay payment success)
export const addFundsToWallet = async (req, res) => {
  try {
    const {
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const paymentResult = await verifyPaymentDirect({
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId: req.userId,
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

    // Atomically increment user's balance
    const user = await User.findOneAndUpdate(
      { _id: req.userId },
      { $inc: { walletBalance: amount } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    // If payment was already verified and processed, do not create duplicate transactions or double-credit
    if (paymentResult.alreadyProcessed) {
      return res.json({
        message: "Funds added successfully (already processed)",
        walletBalance: user.walletBalance,
      });
    }

    await WalletTransaction.create({
      userId: req.userId,
      type: "ADD_FUNDS",
      amount,
      description: "Funds added via Razorpay",
    });

    res.json({
      message: "Funds added successfully",
      walletBalance: user.walletBalance,
    });
  } catch (error) {

    res.status(500).json({ message: "Error adding funds" });
  }
};

// Withdraw Funds from Wallet
export const withdrawFundsFromWallet = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Atomically deduct balance only if user has sufficient funds (prevents race condition)
    const user = await User.findOneAndUpdate(
      { _id: req.userId, walletBalance: { $gte: amount } },
      { $inc: { walletBalance: -amount } },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "Insufficient wallet balance or user not found" });
    }

    await WalletTransaction.create({
      userId: req.userId,
      type: "WITHDRAWAL",
      amount,
      description: "Wallet withdrawal",
    });

    res.json({
      message: "Funds withdrawn successfully",
      walletBalance: user.walletBalance,
    });
  } catch (error) {

    res.status(500).json({ message: "Error withdrawing funds" });
  }
};

export const getWalletTransactions = async (req, res) => {
  try {
    const transactions = await WalletTransaction.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {

    res.status(500).json({ message: "Failed to load transaction history" });
  }
};

// GET /api/wallet/total-donated
export const getTotalDonatedByUser = async (req, res) => {
  try {
    // Accept either a provided userId, or default to logged-in user.
    const userId = req.query.userId || req.userId;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    // Validate ObjectId format to prevent database aggregation errors
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const result = await WalletTransaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: "DONATION",
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const total = result.length > 0 ? result[0].total : 0;
    res.status(200).json({ totalDonated: total });
  } catch (error) {

    res.status(500).json({ message: "Failed to calculate total donated" });
  }
};
