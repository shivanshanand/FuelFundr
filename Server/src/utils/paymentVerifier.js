import crypto from "crypto";
import Payment from "../models/Payment.js";

/**
 * Verifies Razorpay payment signature and records the transaction.
 * Detects duplicate request submissions for idempotency.
 */
export const verifyPaymentDirect = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  amount,
  userId,
}) => {
  try {
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !amount
    ) {
      return { success: false, message: "Missing payment details" };
    }

    // 1. Idempotency Check: Check if this payment was already processed
    const existingPayment = await Payment.findOne({ razorpay_payment_id });
    if (existingPayment) {
      if (existingPayment.status === "SUCCESS") {
        return { success: true, alreadyProcessed: true };
      } else {
        return { success: false, message: "Payment was previously recorded as failed" };
      }
    }

    // 2. Validate HMAC Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      try {
        // 3. Save payment entry atomically
        await Payment.create({
          user: userId || null,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          amount,
          status: "SUCCESS",
        });
      } catch (dbErr) {
        // Catch concurrent duplicate key index collisions (MongoDB code 11000)
        if (dbErr.code === 11000) {
          return { success: true, alreadyProcessed: true };
        }
        throw dbErr;
      }
      return { success: true, alreadyProcessed: false };
    } else {
      return { success: false, message: "Invalid signature" };
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    return { success: false, message: "Payment verification failed" };
  }
};
