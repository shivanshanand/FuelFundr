import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  razorpay_order_id: String,
  razorpay_payment_id: { type: String, unique: true, sparse: true },
  razorpay_signature: String,
  amount: Number,
  status: { type: String, default: "SUCCESS" },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
