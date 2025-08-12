import express from "express";
import User from "../models/User.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

router.get("/overview", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const campaignCount = await Campaign.countDocuments();
    const totalRaisedAgg = await Campaign.aggregate([
      { $group: { _id: null, sum: { $sum: "$amountRaised" } } },
    ]);
    const totalRaised = totalRaisedAgg[0]?.sum || 0;

    res.json({
      userCount,
      campaignCount,
      totalRaised,
      instantPayout: 2,
    });
  } catch (err) {
    console.error("error in stats route", err);
    res.status(500).json({ message: "Failed to load stats" });
  }
});

export default router;
