import User from "../models/User.js";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import WalletTransaction from "../models/WalletTransaction.js";
import mongoose from "mongoose";

// Get Wallet Balance
export const getWalletBalance = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("walletBalance");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ walletBalance: user.walletBalance });
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
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

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.walletBalance += amount;

    await WalletTransaction.create({
      userId: req.userId,
      type: "ADD_FUNDS",
      amount,
      description: "Funds added via Razorpay",
    });

    await user.save();

    res.json({
      message: "Funds added successfully",
      walletBalance: user.walletBalance,
    });
  } catch (error) {
    console.error("Error adding funds:", error);
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

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.walletBalance < amount) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    user.walletBalance -= amount;

    await WalletTransaction.create({
      userId: req.userId,
      type: "WITHDRAWAL",
      amount,
      description: "Wallet withdrawal",
    });

    await user.save();

    res.json({
      message: "Funds withdrawn successfully",
      walletBalance: user.walletBalance,
    });
  } catch (error) {
    console.error("Error withdrawing funds:", error);
    res.status(500).json({ message: "Error withdrawing funds" });
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
        user: userId,
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

export const getWalletTransactions = async (req, res) => {
  try {
    const transactions = await WalletTransaction.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to load transaction history" });
  }
};

// GET /api/wallet/total-donated  (or any route you want)
export const getTotalDonatedByUser = async (req, res) => {
  try {
    // Accept either a provided userId, or default to logged-in user.
    const userId = req.query.userId || req.userId;
    if (!userId) return res.status(400).json({ message: "userId is required" });

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
    console.error("Error getting total donated:", error);
    res.status(500).json({ message: "Failed to calculate total donated" });
  }
};
