import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    amountRaised: { type: Number, default: 0 },
    amountWithdrawn: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: ["open", "fulfilled", "closed"],
      default: "open",
    },
    category: {
      type: String,
      enum: ["Startup", "Hackathon", "Project", "Social Cause", "Creative"],
      required: true,
    },
    image: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donors: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: { type: Number, required: true },
        donatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign;
