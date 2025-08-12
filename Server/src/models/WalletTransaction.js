import mongoose from "mongoose";

const walletTransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["ADD_FUNDS", "DONATION", "WITHDRAWAL"],
      required: true,
    },
    amount: { type: Number, required: true },
    description: { type: String }, // Optional note like "Donated to X", "Withdrawn from Y"
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const WalletTransaction = mongoose.model("WalletTransaction", walletTransactionSchema);

export default WalletTransaction;
