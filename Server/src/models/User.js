import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    googleId: {   // ✅ ADD THIS
    type: String,
    default: null,
  },
  avatar: {     // optional but recommended
    type: String,
    default: "",
  },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // password required ONLY if not Google user
      },
    },
    walletBalance: { type: Number, default: 0 },
    totalDonated: { type: Number, default: 0 },
    socials: {
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    badges: [String],
    bio: { type: String, default: "" },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
